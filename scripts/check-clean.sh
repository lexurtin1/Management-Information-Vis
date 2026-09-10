#!/usr/bin/env bash
# check-clean.sh — fail if any banned string reached the working tree.
# Run before every commit. Wire into .git/hooks/pre-commit once you trust it.

set -uo pipefail

BANNED=(
  # company
  "calastone"
  # real firms
  "blackrock" "goldman" "hsbc" "vanguard" "abrdn" "aberdeen"
  "schroders" "fidelity" "invesco" "hargreaves" "\bfnz\b" "pershing"
  "euroclear" "\bemx\b"
  # named tools
  "salesforce" "\bjira\b" "confluence" "power ?bi" "granola"
  # data globals from the original
  "CALASTONE_FLOWS" "CALASTONE_SETTLEMENTS"
)

EXCLUDES=(
  --exclude-dir=.git
  --exclude-dir=node_modules
  --exclude-dir=.next
  --exclude-dir=dist
  --exclude-dir=build
  --exclude=check-clean.sh
  --exclude=AGENTS.md
)

fail=0

for pattern in "${BANNED[@]}"; do
  if hits=$(grep -rniE "$pattern" . "${EXCLUDES[@]}" 2>/dev/null); then
    echo "BANNED STRING: $pattern"
    echo "$hits" | head -20 | sed 's/^/    /'
    count=$(echo "$hits" | wc -l | tr -d ' ')
    [ "$count" -gt 20 ] && echo "    … and $((count - 20)) more"
    echo
    fail=1
  fi
done

# Oversized files usually mean an inlined data blob came across.
if big=$(find . -type f -size +500k \
      -not -path './.git/*' -not -path './node_modules/*' 2>/dev/null); then
  if [ -n "$big" ]; then
    echo "LARGE FILES (>500KB) — check these are not inlined datasets:"
    echo "$big" | sed 's/^/    /'
    echo
  fi
fi

if [ "$fail" -eq 0 ]; then
  echo "clean — no banned strings found"
else
  echo "FAILED — fix the files above. Do not add exceptions to this script."
fi

exit "$fail"
