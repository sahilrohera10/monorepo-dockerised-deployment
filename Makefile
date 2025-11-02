.PHONY: help build up down logs clean

help:
	@echo "Available commands:"
	@echo "  make build      - Build Docker images"
	@echo "  make up         - Start all services"
	@echo "  make down       - Stop all services"
	@echo "  make logs       - View logs"
	@echo "  make clean      - Clean Docker volumes and images"
	@echo "  make rebuild    - Rebuild and restart services"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

clean:
	docker-compose down -v
	docker system prune -f

rebuild: down
	docker-compose build --no-cache
	docker-compose up -d

# Individual package builds
build-example:
	docker build -f Dockerfile.example -t example-package-image .

build-core:
	docker build -f Dockerfile.core -t core-package-image .

