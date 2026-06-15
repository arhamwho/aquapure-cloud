#!/usr/bin/env bash
set -euo pipefail

echo "=========================================="
echo "AquaPure Cloud System Monitor"
echo "Time: $(date)"
echo "=========================================="

echo ""
echo "CPU Usage"
echo "------------------------------------------"

if [[ "$(uname -s)" == "Darwin" ]]; then
  CPU_LINE="$(top -l 1 | grep "CPU usage" || true)"
  if [[ -n "${CPU_LINE}" ]]; then
    echo "${CPU_LINE}"
  else
    echo "Unable to read CPU usage."
  fi
else
  CPU_IDLE="$(top -bn1 | grep "Cpu(s)" | awk '{print $8}' | cut -d'%' -f1)"
  CPU_USED="$(awk "BEGIN {printf \"%.1f\", 100 - ${CPU_IDLE}}")"
  echo "CPU Used: ${CPU_USED}%"
fi

echo ""
echo "Memory Usage"
echo "------------------------------------------"

if [[ "$(uname -s)" == "Darwin" ]]; then
  MEM_TOTAL_BYTES="$(sysctl -n hw.memsize)"
  MEM_TOTAL_GB="$(awk "BEGIN {printf \"%.2f\", ${MEM_TOTAL_BYTES} / 1024 / 1024 / 1024}")"

  PAGE_SIZE="$(vm_stat | awk '/page size of/ {print $8}')"
  PAGES_FREE="$(vm_stat | awk '/Pages free/ {gsub("\\.", "", $3); print $3}')"
  PAGES_ACTIVE="$(vm_stat | awk '/Pages active/ {gsub("\\.", "", $3); print $3}')"
  PAGES_INACTIVE="$(vm_stat | awk '/Pages inactive/ {gsub("\\.", "", $3); print $3}')"
  PAGES_WIRED="$(vm_stat | awk '/Pages wired down/ {gsub("\\.", "", $4); print $4}')"

  MEM_USED_BYTES="$(( (PAGES_ACTIVE + PAGES_WIRED) * PAGE_SIZE ))"
  MEM_USED_GB="$(awk "BEGIN {printf \"%.2f\", ${MEM_USED_BYTES} / 1024 / 1024 / 1024}")"
  MEM_PERCENT="$(awk "BEGIN {printf \"%.1f\", (${MEM_USED_BYTES} / ${MEM_TOTAL_BYTES}) * 100}")"

  echo "Total Memory: ${MEM_TOTAL_GB} GB"
  echo "Used Memory:  ${MEM_USED_GB} GB (${MEM_PERCENT}%)"
  echo "Free Pages:   ${PAGES_FREE}"
else
  free -h
fi

echo ""
echo "Disk Usage"
echo "------------------------------------------"
df -h / | awk 'NR==1 || NR==2 {print}'

echo ""
echo "Docker Containers"
echo "------------------------------------------"

if command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then
  docker compose ps 2>/dev/null || docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
else
  echo "Docker is not running."
fi

echo ""
echo "=========================================="
echo "Monitor check complete."
echo "=========================================="
