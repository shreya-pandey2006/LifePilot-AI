FROM n8nio/n8n:1.82.0

USER root

# Disable heavy features & runners to keep RAM low
ENV NODE_OPTIONS="--max-old-space-size=280"
ENV N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS="true"
ENV N8N_METRICS="false"
ENV N8N_COMMUNITY_PACKAGES_ENABLED="false"
ENV N8N_AI_ASSISTANT_ENABLED="false"
ENV N8N_RUNNERS_ENABLED="false"

# Explicitly bind n8n to listen on all network interfaces on port 5678
ENV N8N_HOST="0.0.0.0"
ENV N8N_PORT=5678
ENV PORT=5678
EXPOSE 5678

CMD ["n8n", "start"]
