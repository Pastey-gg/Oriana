.PHONY: up down restart purge restart-build up-build

COMMIT ?= $(shell git rev-parse HEAD)
COMMIT_TIME ?= $(shell git show -s --format=%cI HEAD)
ORIANA_VERSION ?= $(shell sed -n '1p' VERSION)
PASTEY_VERSION ?= $(shell if [ -f ../VERSION ]; then sed -n '1p' ../VERSION; else printf dev; fi)
BUILD_ARGS := --build-arg PASTEY_VERSION=$(PASTEY_VERSION) --build-arg ORIANA_VERSION=$(ORIANA_VERSION) --build-arg COMMIT=$(COMMIT) --build-arg COMMIT_TIME=$(COMMIT_TIME)

up:
	docker compose up -d

up-build:
	docker compose build $(BUILD_ARGS) app
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

restart-build:
	docker compose build $(BUILD_ARGS) app
	docker compose up -d --force-recreate

purge:
	docker compose down --volumes --remove-orphans
