# Etape 1: Build (compilation)
FROM golang:1.23 AS builder
WORKDIR /app

# Copier les fichiers Go
COPY src/main.go ./
RUN go mod init portfolio || true

# Compiler l'application
RUN CGO_ENABLED=0 GOOS=linux go build -o portfolio main.go

# Etape 2: Runtime (image finale légère)
FROM alpine:latest
WORKDIR /app

# Copier l'exécutable compilé
COPY --from=builder /app/portfolio .

# Copier les fichiers statiques
COPY assets ./assets
COPY templates ./templates

# Exposer le port
EXPOSE 8000

# Lancer l'application
CMD ["./portfolio"]