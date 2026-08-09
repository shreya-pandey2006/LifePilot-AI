FROM n8nio/n8n:1.82.0

USER root

# Disable heavy features & lower memory footprint at container level
ENV NODE_OPTIONS="--max-old-space-size=280"
ENV EXECUTIONS_PROCESS="main"
ENV N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS="true"
ENV N8N_METRICS="false"
ENV N8N_COMMUNITY_PACKAGES_ENABLED="false"
ENV N8N_AI_ASSISTANT_ENABLED="false"

# Set standard ports
ENV PORT=5678
ENV N8N_PORT=5678
EXPOSE 5678

CMD ["n8n", "start"]
