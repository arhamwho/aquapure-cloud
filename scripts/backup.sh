#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
BACKUP_DIR="${PROJECT_ROOT}/backups"
ENV_FILE="${PROJECT_ROOT}/backend/.env"
TIMESTAMP="$(date +"%Y%m%d_%H%M%S")"
BACKUP_FILE="${BACKUP_DIR}/aquapure_${TIMESTAMP}.sql"

DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""
DB_NAME="aquapure"

if [[ -f "${ENV_FILE}" ]]; then
  # shellcheck disable=SC1090
  set -a
  source "${ENV_FILE}"
  set +a
fi

mkdir -p "${BACKUP_DIR}"

echo "Starting MySQL backup..."
echo "Database: ${DB_NAME}"
echo "Host: ${DB_HOST}"

if ! command -v mysqldump >/dev/null 2>&1; then
  echo "Error: mysqldump not found. Install MySQL client tools first."
  exit 1
fi

if [[ -n "${DB_PASSWORD}" ]]; then
  mysqldump \
    -h "${DB_HOST}" \
    -u "${DB_USER}" \
    -p"${DB_PASSWORD}" \
    --single-transaction \
    --routines \
    --triggers \
    "${DB_NAME}" > "${BACKUP_FILE}"
else
  mysqldump \
    -h "${DB_HOST}" \
    -u "${DB_USER}" \
    --single-transaction \
    --routines \
    --triggers \
    "${DB_NAME}" > "${BACKUP_FILE}"
fi

echo "Backup completed successfully."
echo "Saved to: ${BACKUP_FILE}"
