#!/command/execlineb -S0
# ==============================================================================
# Home Assistant Add-on: AWEKAS Receiver finish script
# Prevents restart loop on startup failures
# ==============================================================================

# Exit code from run script is in $1
# If exit code is not 0, prevent service restart
foreground { s6-echo "[finish] Service exited with code ${1}" }

# Exit code 0 = normal shutdown, allow restart
# Exit code 1 = startup error, don't restart (125 tells s6 not to restart)
ifelse { s6-test ${1} -eq 0 }
{
  # Normal exit, allow restart
  s6-echo "[finish] Normal shutdown, service can restart"
  exit 0
}
{
  # Error exit, prevent restart
  s6-echo "[finish] Startup error detected, preventing restart loop"
  exit 125
}
