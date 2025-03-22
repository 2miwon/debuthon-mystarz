API_URL ?= https://ag.eqhub.eqbr.com/api
# CRON_SCHEDULE ?= "0 */5 * * * *"  # every 5 minutes
CRON_SCHEDULE ?= "* * * * * *"  # every second for debug
PORT ?= 3000

CARGO := cargo
BUILD_MODE ?= debug
RELEASE_FLAG = $(if $(filter-out debug,$(BUILD_MODE)),--release,)
TARGET_DIR = $(if $(filter-out debug,$(BUILD_MODE)),target/release,target/debug)
BINARY_NAME = mystarz

.PHONY: all build run clean check test

all: build

build:
	$(CARGO) build $(RELEASE_FLAG)

run: build
	API_URL=$(API_URL) CRON_SCHEDULE=$(CRON_SCHEDULE) PORT=$(PORT) RUST_LOG="info" \
	cargo watch -x run

test:
	$(CARGO) test

check:
	$(CARGO) check
	$(CARGO) clippy -- -D warnings
	$(CARGO) fmt --check

fmt:
	$(CARGO) fmt

update:
	$(CARGO) update

clean:
	$(CARGO) clean
	rm -rf ./target

docker-build:
	docker build -t $(BINARY_NAME) \
		--build-arg API_URL=$(API_URL) \
		--build-arg CRON_SCHEDULE=$(CRON_SCHEDULE) \
		--build-arg PORT=$(PORT) \
		.

docker-run:
	docker run -p $(PORT):$(PORT) \
		-e API_URL=$(API_URL) \
		-e CRON_SCHEDULE=$(CRON_SCHEDULE) \
		-e PORT=$(PORT) \
		$(BINARY_NAME)

# custom order
call-api-now:
	API_URL=$(API_URL) PORT=$(PORT) \
	./$(TARGET_DIR)/$(BINARY_NAME) --call-now

# 도움말
help:
	@echo "Mystarz Axum API Makefile"
	@echo ""
	@echo "  make build        - build the project"
	@echo "  make run          - run the project"
	@echo "  make run-dev      - run the project with auto rerun"
	@echo "  make test         - run tests"
	@echo "  make check        - run clippy and fmt"
	@echo "  make fmt          - run rustfmt"
	@echo "  make clean        - clean the project"
	@echo "  make docker-build - build docker image"
	@echo "  make docker-run   - run docker image"
	@echo ""
	@echo "envs:"
	@echo "  API_URL=$(API_URL)"
	@echo "  CRON_SCHEDULE=$(CRON_SCHEDULE)"
	@echo "  PORT=$(PORT)"
	@echo "  BUILD_MODE=$(BUILD_MODE)"