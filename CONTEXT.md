# TrafficPredictor — AI Context

Serverless real-time traffic monitoring & ML-powered forecasting for Ho Chi Minh City.
Data flows HERE API → TimeXer transformer → DynamoDB via a 5-minute Step Functions ETL pipeline,
with a Flask API backend serving a Next.js Leaflet map UI over SSE for live updates.

---

## 1. Tech Stack

| Layer | Technology | Runtime / Infra |
|-------|-----------|-----------------|
| **Frontend** | Next.js 15 + React 19 + Tailwind 4 + Leaflet | Vercel / Browser |
| **Backend API** | Flask 3 + Pydantic v2 + flask-cors | Lambda + API Gateway |
| **ML Inference** | PyTorch 2.1 + TimeXer transformer | Container Lambda (ECR) |
| **ETL Pipeline** | 4 Lambda functions + Step Functions | EventBridge (rate 5 min) |
| **Database** | DynamoDB (4 tables, on-demand) | AWS |
| **Streaming** | SNS → SSE via API Gateway | Lambda + DynamoDB connections |
| **Alerts** | Telegram Bot API | Lambda (requests) |
| **Infrastructure** | Terraform 1.5+ (10 modules) | AWS (ap-southeast-1) |
| **CI/CD** | GitHub Actions (5 jobs) | GitHub |
| **Quality** | Ruff, mypy, pre-commit (9 hooks) | Local + CI |

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      EventBridge (rate 5 min)                │
│                              │                               │
│                     Step Functions (STANDARD)                │
│                              │                               │
│    ┌────────┐   ┌─────────┐   ┌──────┐   ┌────────┐        │
│    │Extract │──▶│Transform│──▶│ Load │──▶│Predict │──┐      │
│    │(HERE)→S3│  │S3→JSONL │  │→DDB  │  │TimeXer │  │      │
│    └────────┘   └─────────┘   └──────┘   └────────┘  │      │
│                                                       │      │
│    ┌──────────────┐    ┌─────────────────┐            │      │
│    │NotifySuccess │    │  NotifyFailure   │◄──────────┘      │
│    │(Telegram OK) │    │(Telegram error)  │                  │
│    └──────────────┘    └─────────────────┘                   │
│                              │                               │
│                         ┌────────┐                           │
│                         │ Notify │──▶ SNS ──▶ SSE ──▶ Browser│
│                         │(SSE)   │      │                    │
│                         └────────┘      │                    │
│                                   ┌─────▼─────┐              │
│                                   │ Telegram   │              │
│                                   │ Bot Alerts │              │
│                                   └───────────┘              │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  Flask API (Lambda)│◄── API Gateway
                    │  /health          │
                    │  /api/segments    │
                    │  /api/current     │
                    │  /api/predict     │
                    │  /api/db_notice   │
                    └───────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  Next.js Frontend  │
                    │  - Leaflet Map     │
                    │  - Sidebar/List    │
                    │  - SSE Realtime    │
                    └───────────────────┘
```

## 3. Repository Map

```
TrafficPredictor/
├── AGENTS.md                 # AI assistant instructions (this file is companion to it)
├── CONTEXT.md                # This file — full AI-readable project context
├── README.md                 # Human-readable project overview
├── DEVELOPMENT.md            # Detailed development setup guide
├── Makefile                  # 20+ convenience commands (test, lint, docker, terraform)
├── pyproject.toml            # Python project config, deps, ruff/mypy/pytest settings
├── docker-compose.yml        # Backend (Flask:5000) + MongoDB (legacy, port 27017)
├── .pre-commit-config.yaml   # 9 hooks (ruff, mypy, terraform, hadolint, gitleaks, bandit, commitizen)
├── LICENSE                   # MIT
│
├── backend/
│   ├── Dockerfile            # Python 3.11-slim, CPU PyTorch, Flask on :5000
│   ├── requirements.txt      # Flask, boto3, pydantic, numpy, PyWavelets, torch, gunicorn
│   ├── app/
│   │   ├── app.py            # WSGI entry: `python -m app.app` → Flask on 0.0.0.0:5000
│   │   ├── __init__.py       # create_app() factory: logging, CORS, error handlers, blueprints
│   │   ├── config.py         # Frozen Settings dataclass (reads env vars)
│   │   ├── dependencies.py   # DI container (ServiceContainer) — lazy-inits repo, mapper, model, services
│   │   ├── errors.py         # AppError hierarchy (BadRequest 400, NotFound 404, UpstreamError 502, ...)
│   │   ├── schemas.py        # Pydantic models: SegmentRequest, CurrentResponse, PredictResponse, SegmentItem
│   │   ├── utils.py          # SegmentMapping (DDB cache with 5min TTL), DataForModel (DWT denoising)
│   │   ├── models/
│   │   │   ├── model.py      # TimeXer: transformer (seq=96, pred=12, d_model=256, 4 enc layers, 325 vars)
│   │   │   └── timexer_model.py  # GetModel wrapper: load .pth → predict(data) → numpy
│   │   ├── repositories/
│   │   │   ├── dynamodb_repository.py  # Primary: get_latest_speed, get_recent_speeds, get_latest_prediction
│   │   │   └── mongo_repository.py     # Legacy (unused in prod, kept for local dev compat)
│   │   ├── routes/
│   │   │   ├── health_routes.py        # GET /health → {"status": "ok"}
│   │   │   └── traffic_routes.py       # GET /segments, POST /current, POST /predict, POST /db_notice
│   │   ├── services/
│   │   │   ├── traffic_service.py      # get_current_speed_kmh(), get_prediction()
│   │   │   └── prediction_service.py   # update_predictions() — batch inference over all segments
│   │   └── notebook/
│   │       └── TimeXer.pth             # Trained model weights (325-variate, 96→12 step)
│   └── lambdas/
│       ├── api/              # handler.py: Flask wrapped in aws-lambda-wsgi.response()
│       ├── extract/          # handler.py: HERE API → S3 raw/{ts}.json (radius 15km HCMC)
│       ├── transform/        # handler.py: parse flow → JSONL → S3 processed/; auto-register segments
│       ├── load/             # handler.py: JSONL → batch write to DynamoDB speeds table
│       ├── predict/          # handler.py: scan segments → get 96 readings → TimeXer → store forecasts
│       ├── notify/           # handler.py: SNS → scan connections DDB → API Gateway Management → SSE
│       ├── notify-telegram/  # handler.py: Telegram bot success/failure alerts (HTML format)
│       ├── sse-connect/      # handler.py: returns 200 with SSE headers (text/event-stream)
│       └── websocket/        # connect.py (store connection_id + TTL), disconnect.py (delete)
│   └── step-function/
│       └── definition.asl.json  # DOCUMENTATION ONLY — template with ${Var} placeholders
│
├── web/
│   ├── package.json          # Next.js 15, React 19, Leaflet, Tailwind 4, lucide-react
│   ├── tsconfig.json         # ES2017, strict, bundler module resolution, @/* → ./src/*
│   ├── next.config.ts        # Empty (default Next.js)
│   ├── vercel.json           # Framework: nextjs
│   ├── postcss.config.mjs    # @tailwindcss/postcss plugin
│   └── src/
│       ├── app/
│       │   ├── globals.css   # Tailwind import
│       │   ├── layout.tsx    # Root layout: Leaflet CSS, dark theme
│       │   └── page.tsx      # Client page: fetch segments → Map + Sidebar + SSE
│       ├── components/
│       │   ├── map-panel.tsx       # Leaflet map: polylines (active=cyan, inactive=slate), popups, click select
│       │   └── sidebar.tsx         # Search, segment list, speed badge (red<15, amber<25, green≥25), forecast
│       ├── hooks/
│       │   └── useRealtime.ts      # SSE hook: returns {latestUpdate, connected}
│       └── lib/
│           ├── api.ts              # fetchSegments (GET /segments), postPredict (POST /predict)
│           ├── sse.ts              # SseClient: exponential backoff reconnect (1s–30s), listens for "update"
│           └── types.ts            # RoadSegment, PredictResponse, SseUpdate types
│
├── infra/
│   ├── main.tf               # Root module (546 lines): instantiates all 10 sub-modules + step function inline
│   ├── providers.tf          # AWS ~>5.0, S3 backend (traffic-predictor-tfstate), default tags
│   ├── variables.tf          # 7 vars: region, env, project_name, vpc_cidr, azs, here_api_key, telegram_*
│   ├── outputs.tf            # 20 outputs: vpc_id, ECR repos, S3 buckets, DDB tables, URLs, ARNs
│   ├── environments/
│   │   ├── dev.tfvars        # dev, 2 AZs, empty HERE_API_KEY
│   │   └── prod.tfvars       # prod, 3 AZs, empty HERE_API_KEY
│   └── modules/
│       ├── networking/       # VPC (10.0.0.0/16), 2 pub + 2 priv subnets, NAT Gateway, IGW, route tables
│       ├── ecr/              # 3 repos (backend, airflow, predict), keep last 10 images, scan on push
│       ├── s3/               # 5 buckets (data, raw, processed, lambdas, models), versioning, AES256 SSE
│       ├── dynamodb/         # 4 tables: segments (GSI), speeds (PK:seg, SK:ts), predictions, connections (TTL)
│       ├── lambda-function/  # Reusable module: Zip or Container, IAM role, VPC option, env vars
│       ├── api-gateway/      # REST API: proxy ANY {proxy+} → Lambda, stage "dev"
│       ├── sse-api-gateway/  # REST API: /connect → Lambda, stage "dev"
│       ├── step-function/    # aws_sfn_state_machine (STANDARD type)
│       ├── eventbridge/      # CloudWatch Event Rule (rate 5 min) → Step Function target
│       └── sns/              # SNS topic for pipeline notifications
│
├── tests/
│   ├── conftest.py           # MockDynamoDBTable (in-memory), MockDynamoDBResource, fixtures: app, client
│   ├── unit/
│   │   ├── test_config.py    # Settings defaults, from_env(), frozen dataclass (5 tests)
│   │   ├── test_schemas.py   # SegmentRequest validation (4 tests)
│   │   └── test_errors.py    # Exception hierarchy (4 classes tested)
│   └── integration/
│       └── test_api_endpoints.py  # Health + traffic endpoints (6 tests)
│
├── docs/
│   ├── api-reference.md      # Full REST API docs
│   ├── architecture.md       # Architecture documentation
│   ├── architecture.drawio   # Draw.io diagram source
│   └── architecture.png      # Rendered architecture diagram
│
└── .github/
    └── workflows/
        └── ci.yml            # 5 jobs: backend test, frontend test, docker build, terraform validate, security
```

## 4. Data Pipeline (ETL)

The pipeline runs every 5 minutes via EventBridge → Step Functions.

### Stage 1: Extract (`lambdas/extract/handler.py`)
- Calls HERE Traffic API v7 (`/flow` endpoint) with circle query around HCMC center (10.776889, 106.695278, radius 15km)
- Stores raw JSON response in S3: `raw/traffic/{timestamp}.json`
- Output: `{status, bucket, key, results_count}`

### Stage 2: Transform (`lambdas/transform/handler.py`)
- Reads raw JSON from S3
- Parses flow data (RDS/TMC segments), normalizes shape coordinates
- Hashes shape for deduplication; auto-registers new segments in DynamoDB `segments` table (auto-increment `segment_index`)
- Computes `speed_kmh = speed_ms * 3.6`
- Writes JSONL to S3: `transformed/traffic/{timestamp}.jsonl`
- Output: `{bucket, key, count}`

### Stage 3: Load (`lambdas/load/handler.py`)
- Reads JSONL from S3, batch-writes to DynamoDB `speeds` table
- Fields per record: `segment_index`, `timestamp`, `speed_ms`, `speed_kmh`, `jam_factor`, `free_flow_speed`, `confidence`
- Output: `{inserted}` (count)

### Stage 4: Predict (`lambdas/predict/handler.py`)
- Scans all segments from DynamoDB segments table
- For each segment, queries last 96 `speed_kmh` readings (seq_len)
- Pads shorter series, transposes to shape `(seq_len, num_variate)`
- Runs `DataForModel` preprocessing: m/s → km/h (if needed), DWT denoising (db4, soft thresholding), zero-pads to 325 variates
- Runs TimeXer inference → 12-step forecast (pred_len)
- Stores prediction in DynamoDB `predictions` table
- Output: `{inserted}` (count)

### Stage 5: Notify (`lambdas/notify/handler.py`)
- Triggered via SNS subscription after Predict completes
- Scans DynamoDB `connections` table for active WebSocket connections
- Posts `update` to each connection via API Gateway Management API
- Removes stale connections (`GoneException`)
- Output: `{sent}` (count)

### Error Handling
- All Step Function states have `Retry`: max 3 attempts, 2s base delay, 2x exponential backoff
- All states have `Catch`: routes to `NotifyFailure` state
- `NotifySuccess`/`NotifyFailure` send Telegram alerts via `notify-telegram` Lambda
- Telegram messages use HTML formatting with pipeline counts or error details

## 5. Backend (Flask + Lambda)

### Flask App Factory (`backend/app/__init__.py`)
- `create_app()`: sets up logging (INFO/stdout, mongo/boto3 at WARNING), CORS globally, registers error handlers, registers 2 blueprints

### DI Container (`backend/app/dependencies.py`)
- `ServiceContainer` dataclass with lazy properties:
  - `db_repo` → `DynamoDBRepository`
  - `segment_mapping` → `SegmentMapping` (loads segments from DDB, 5-min TTL cache)
  - `timexer_model` → `TimeXerModel` (loads .pth weights)
  - `traffic_service` → `TrafficService` (repo + mapper)
  - `prediction_service` → `PredictionService` (repo + mapper + model)
- Global singleton pattern with `get_service_container()` / `reset_service_container()`

### Routes

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| GET | `/health` | `health_routes` | Returns `{"status": "ok"}` |
| GET | `/api/segments` | `traffic_routes` | Lists all segments with index, name, shape |
| POST | `/api/current` | `traffic_routes` | Body: `{segment_index}` → returns current speed km/h |
| POST | `/api/predict` | `traffic_routes` | Body: `{segment_index}` → returns current + 12-step forecast |
| POST | `/api/db_notice` | `traffic_routes` | Body: `{"notice": "update"}` → triggers batch prediction |

### Lambda Handlers (9 total)

| Lambda | Trigger | Key Behavior |
|--------|---------|--------------|
| `api` | API Gateway (REST) | `aws_lambda_wsgi.response(create_app(), event, context)` |
| `extract` | Step Functions | HERE API → S3 raw |
| `transform` | Step Functions | S3 raw → parse → JSONL → S3 processed; auto-register segments |
| `load` | Step Functions | JSONL → batch write DynamoDB speeds |
| `predict` | Step Functions | Segment scan → TimeXer inference → store forecasts |
| `notify` | SNS | SSE broadcast to all WebSocket connections |
| `notify-telegram` | Step Functions | Telegram success/failure alerts |
| `sse-connect` | SSE API Gateway | Returns 200 with SSE headers |
| `websocket (connect)` | WebSocket API | Stores connection_id in DynamoDB (TTL 86400s) |
| `websocket (disconnect)` | WebSocket API | Deletes connection_id from DynamoDB |

**Naming note**: Lambda handler files are `handler.py`, but Terraform references `index.handler`. The build/deploy pipeline must rename or symlink.

## 6. ML Model (TimeXer)

### Architecture
- **Input**: 96 time steps (`seq_len`) × 325 variates (`num_variate`)
- **Output**: 12 time steps (`pred_len`) × 325 variates
- **d_model**: 256
- **Encoder layers**: 4
- **Patch**: `patch_len=12`, `patch_num=8`

### Components
1. **PositionalEmbedding**: Sinusoidal position encoding
2. **Inverted_EmbeddingData**: Linear projection of exogenous data (seq_len → d_model)
3. **EnEmbedding**: Patches time series → value embedding + position embedding + global token
4. **TX_EncoderLayer**: Self-attention → cross-attention (with global token) → feed-forward (GELU, Conv1d)
5. **TX_Encoder**: Stack of 4 encoder layers + LayerNorm
6. **FlattenHead**: Flatten + linear projection to pred_len
7. **TimeXer**: Full model with reversible instance normalization

### Preprocessing (`DataForModel` in `utils.py`)
- Converts m/s to km/h (×3.6)
- DWT denoising using `db4` wavelet with soft thresholding
- Zero-pads to exactly 325 variates

### Attention Mask
- Boolean `attn_mask` of shape `(325, 325)`
- Only first 8 columns are `True` (unmasked) — the rest are masked out

### Inference Path
```
GetModel.from_path("app/notebook/TimeXer.pth")  → loads state dict
model.predict(data)  → prepares attention mask, runs TimeXer.forward(), returns numpy array
```

## 7. Database (DynamoDB)

| Table | Hash Key | Range Key | GSI | TTL | Billing |
|-------|----------|-----------|-----|-----|---------|
| `segments` | `shape_hash` (S) | — | `segment_index` | — | PAY_PER_REQUEST |
| `speeds` | `segment_index` (N) | `timestamp` (S) | — | — | PAY_PER_REQUEST |
| `predictions` | `segment_index` (N) | `timestamp` (S) | — | — | PAY_PER_REQUEST |
| `connections` | `connection_id` (S) | — | — | `ttl` (86400s) | PAY_PER_REQUEST |

**`speeds` table attributes**: `segment_index`, `timestamp`, `speed_ms`, `speed_kmh`, `jam_factor`, `free_flow_speed`, `confidence`

**`predictions` table**: forecasts stored as JSON string in the `speeds` attribute (deserialized on read)

## 8. Frontend (Next.js)

### Pages
- **`layout.tsx`**: Root layout — Leaflet CSS (CDN), dark theme (`bg-zinc-950 text-zinc-50`), full height
- **`page.tsx`** ("use client"): Fetches segments on mount, dynamic imports MapPanel (SSR disabled), renders Sidebar (380px) + MapPanel (1fr)

### Components
- **`sidebar.tsx`**: Search filter by name/index, scrollable segment list, active segment panel with speed badge (color-coded: red <15 km/h, amber 15-25, green ≥25), "Fetch forecast" button, SSE real-time updates, 10-min / 60-min average forecast display
- **`map-panel.tsx`**: Leaflet map (OpenStreetMap tiles), road segment polylines (active=cyan `#22d3ee`, inactive=slate `#64748b`, 6px vs 3px), popups on click, click-to-select, auto-center on active segment (zoom 15) or full view (zoom 13)

### SSE (Server-Sent Events)
- **`lib/sse.ts`**: `SseClient` class with exponential backoff reconnect (1s base, 30s max). Listens for `update` events. Callbacks: onMessage, onError, onConnect, onDisconnect.
- **`hooks/useRealtime.ts`**: Hook wrapping SseClient — returns `{latestUpdate, connected}`
- **`SseUpdate` type**: `{type: "update", data: {timestamp, segments: [{segment_index, current, predict}]}}`

### API Client (`lib/api.ts`)
- `fetchSegments()`: GET `/api/segments` with 10s timeout → `RoadSegment[]`
- `postPredict(segmentIndex)`: POST `/api/predict` with 5s timeout → `PredictResponse`
- Both gracefully handle missing API_URL, network errors, non-ok responses

## 9. Infrastructure (Terraform)

### Modules (10 total)

| Module | Resources | Key Config |
|--------|-----------|------------|
| **networking** | VPC (10.0.0.0/16), IGW, 2 pub + 2 priv subnets, NAT GW (EIP), route tables | Multi-AZ |
| **ecr** | 3 repos (backend, airflow, predict) | Keep last 10 images, scan on push |
| **s3** | 5 buckets (data, raw, processed, lambdas, models) | Versioning, AES256 SSE, public blocked |
| **dynamodb** | 4 tables (segments, speeds, predictions, connections) | On-demand, TTL on connections |
| **lambda-function** | Reusable: Zip or Container, IAM role, VPC, env vars | Configurable per function |
| **api-gateway** | REST API, proxy `{proxy+}` ANY → Lambda | Stage "dev" |
| **sse-api-gateway** | REST API, `/connect` → Lambda | Stage "dev" |
| **step-function** | State machine (STANDARD) | Inline definition from root module |
| **eventbridge** | Event Rule (rate 5 min) → Step Function | IAM role for invocation |
| **sns** | SNS topic → notify Lambda | Pipeline notifications |

### Lambda Configurations

| Lambda | Memory | Timeout | Type | VPC |
|--------|--------|---------|------|-----|
| api | 256MB | 30s | Zip | No |
| extract | 256MB | 120s | Zip | No |
| transform | 512MB | 300s | Zip | No |
| load | 512MB | 300s | Zip | No |
| predict | 1024MB | 120s | Container (ECR) | Yes |
| notify | 256MB | 30s | Zip | No |
| sse-connect | 128MB | 10s | Zip | No |
| telegram | 128MB | 10s | Zip | No |
| websocket-connect | 128MB | 10s | Zip | No |
| websocket-disconnect | 128MB | 10s | Zip | No |

## 10. API Surface

### REST Endpoints

**`GET /health`**
→ `200: {"status": "ok"}`

**`GET /api/segments`**
→ `200: [{"segment_index": int, "name": str, "shape": [{"lat": float, "lng": float}]}]`

**`POST /api/current`**
Request: `{"segment_index": int (>=1)}`
→ `200: {"segment_index": int, "current": float}`
→ `400: {"error": "Invalid request", "detail": {...}}`

**`POST /api/predict`**
Request: `{"segment_index": int (>=1)}`
→ `200: {"segment_index": int, "name": str, "current": float, "predict": [float, ...]}`
→ `400: {"error": ...}`

**`POST /api/db_notice`**
Request: `{"notice": "update"}`
→ `200: {"status": "ok", "inserted": int}`

### SSE Endpoint

**`GET /connect`** (via SSE API Gateway)
- Headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`
- Events: `update` with JSON payload `{type: "update", data: {timestamp, segments: [...]}}`
- Client reconnection: exponential backoff 1s–30s

## 11. Environment Variables

| Variable | Where Used | Default | Purpose |
|----------|-----------|---------|---------|
| `HERE_API_KEY` | `extract` Lambda | — | HERE Traffic API v7 authentication |
| `TELEGRAM_BOT_TOKEN` | `notify-telegram` Lambda | — | Telegram bot for pipeline alerts |
| `TELEGRAM_CHAT_ID` | `notify-telegram` Lambda | — | Target chat for alerts |
| `DYNAMODB_TABLE` | Backend (`config.py`) | `traffic-speeds` | DynamoDB speeds table name |
| `SEGMENTS_TABLE` | Backend + Lambdas | `traffic-segments` | DynamoDB segments table name |
| `SPEEDS_TABLE` | Backend + Lambdas | `traffic-speeds` | DynamoDB speeds table name |
| `PREDICTIONS_TABLE` | Backend + Lambdas | `traffic-predictions` | DynamoDB predictions table name |
| `CONNECTIONS_TABLE` | Lambda (websocket) | `traffic-connections` | DynamoDB connections table name |
| `AWS_REGION` | Backend + Lambdas | `ap-southeast-1` | AWS region |
| `MODEL_PATH` | Backend (`config.py`) | `app/notebook/TimeXer.pth` | Path to model weights |
| `NEXT_PUBLIC_API_URL` | Frontend (`lib/api.ts`) | `http://localhost:5000` | Backend API URL |
| `NEXT_PUBLIC_SSE_URL` | Frontend (`page.tsx`) | — | SSE endpoint URL |
| `RAW_BUCKET` | `extract`/`transform` Lambdas | — | S3 bucket for raw traffic data |
| `PROCESSED_BUCKET` | `transform`/`load` Lambdas | — | S3 bucket for processed JSONL |

## 12. CI/CD & Quality

### GitHub Actions (`.github/workflows/ci.yml` — 5 jobs)

1. **Backend Tests**: Python 3.11, ruff lint, pytest with coverage, upload to Codecov
2. **Frontend Tests**: Node.js 20, `npm ci`, lint, `tsc --noEmit`, `npm run build`
3. **Docker Build**: Build backend image (no push), Docker Buildx cache
4. **Terraform Validate**: `terraform init -backend=false`, `validate`, `fmt -check`
5. **Security Scan**: Trivy filesystem scan, SARIF upload to GitHub Security

### Pre-commit Hooks (`.pre-commit-config.yaml` — 9 hooks)
1. `pre-commit-hooks`: trailing-whitespace, end-of-file-fixer, check-yaml/json/toml, check-added-large-files (500KB), check-merge-conflict, detect-private-key, debug-statements
2. `ruff`: lint with --fix
3. `ruff-format`: auto-format
4. `mypy`: type check (excludes `tests/`)
5. `terraform_fmt`: format Terraform files
6. `terraform_validate`: validate Terraform
7. `terraform_docs`: generate docs
8. `hadolint`: Dockerfile lint
9. `gitleaks`: secret scanning
10. `bandit`: Python security lint
11. `commitizen`: commit message format (commit-msg stage)

### Makefile Commands
| Command | Action |
|---------|--------|
| `make backend-test` | Run pytest with coverage |
| `make backend-lint` | Run ruff check + format |
| `make docker-run` | Start Flask + MongoDB via Docker Compose |
| `make frontend-dev` | Start Next.js dev server on :3000 |
| `make terraform-plan` | Terraform plan with dev vars |

## 13. Testing Strategy

### Test Layout
```
tests/
├── conftest.py          # Fixtures and mocks
├── unit/                # Isolated unit tests (no network)
└── integration/         # API endpoint integration tests
```

### Key Fixtures (`tests/conftest.py`)
- **`MockDynamoDBTable`**: In-memory dict-backed mock supporting `query()`, `scan()`, `get_item()`, `put_item()`, `batch_writer()`
- **`MockDynamoDBResource`**: Returns `MockDynamoDBTable` for any table name
- **`app(test_settings)`**: Flask app with `boto3.resource` → mock, `TimeXerModel` → MagicMock, `SegmentMapping` → MagicMock
- **`client(app)`**: Flask test client

### Test Coverage
- **Unit**: Settings defaults/from_env/frozen, schema validation (valid/invalid segment_index), error class hierarchy (4 exceptions)
- **Integration**: Health endpoint returns 200+JSON; segments endpoint returns 200; invalid request bodies return 400

### Running
```bash
pytest tests/ -v --tb=short --cov=backend
```

## 14. Key Gotchas & Conventions

### Lambda Handler Naming
- Source files: `backend/lambdas/*/handler.py`
- Terraform references: `handler = "index.handler"`
- **Build pipeline must rename or symlink** `handler.py` → `index.py` (or deploy with appropriate mapping)

### Step Function Definition
- **Source of truth**: inline JSON in `infra/main.tf` (real ARN references)
- `backend/step-function/definition.asl.json` has `${Var}` placeholders and is **documentation only** — never edit that file for actual changes

### Ruff Per-File Rules (from `pyproject.toml`)
- `tests/*`: ignores `S101` (assert used), `PLR2004` (magic value comparisons)
- `backend/app/models/model.py`: ignores `N806` (non-lowercase variable names in functions)

### Local Dev vs Production
- Docker Compose starts MongoDB (port 27017) for legacy local dev
- Production code uses **DynamoDB only** via `dynamodb_repository.py`
- `mongo_repository.py` is kept for compatibility but unused in prod

### Frontend SSR
- MapPanel uses `dynamic(() => import("./components/map-panel"), { ssr: false })` because Leaflet requires `window`
- Page is `"use client"` — no server components

### Commit Convention
- Enforced by commitizen pre-commit hook
- Follows conventional commits format (e.g., `feat:`, `fix:`, `chore:`, `docs:`)

### Model Weights
- Trained model at `backend/app/notebook/TimeXer.pth`
- Git-ignored (`.pth` files in `.gitignore`)
- Must be present for inference (both local dev and predict Lambda)

### Secrets
- `.env` files are gitignored
- `HERE_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` are Terraform-sensitive variables
- gitleaks pre-commit hook scans for accidental secret commits
