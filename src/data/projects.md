## RAG & Knowledge Retrieval (24)

### 1. Intelligent Troubleshooting in OS 2200 using AI Expert System

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Python, Neo4j, PySpark, Qdrant, FAISS, e5-large-v2, Llama 3, LangGraph, SSE
- **Core Features & Architecture:**
    - Graph-Augmented RAG combining semantic retrieval with Neo4j-based context for multi-hop analysis
    - PySpark pipeline for unstructured PDF extraction and indexing
    - Hybrid retrieval using Qdrant/FAISS with Cross-Encoder reranking
    - LangGraph-orchestrated workflow for incident evidence retrieval
    - GPU-hosted Llama 3 inference with SSE streaming

### 2. PaperMind — Agentic GraphRAG Research Assistant

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Neo4j, FAISS, LangGraph
- **Core Features & Architecture:**
    - Knowledge graph construction (4,266 entities, 5,507 relations)
    - Hybrid retrieval combining FAISS vector search and Cypher graph queries
    - Token-budget context packing for LLM input optimization
    - BGE-based citation validation pipeline

### 3. DataSutra (Agentic RAG System)

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Python, Hybrid Fusion Retrieval, BM25, Vector Search
- **Core Features & Architecture:**
    - Hybrid Fusion Retrieval combining Dual-Vector embeddings and BM25
    - Cognitive Reranking layer to optimize retrieval precision
    - Autonomous verification pipeline to mitigate hallucinations
    - Self-Reasoning Language Model (SRLM) orchestration

### 4. Document RAG Assistant

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Python, FastAPI, LangChain, Gemini API, Cohere Rerank, Qdrant, Redis, Taskiq, PostgreSQL, Next.js, LangSmith
- **Core Features & Architecture:**
    - Asynchronous ingestion pipeline with PostgreSQL-backed state tracking and transactional outbox for retry-safe document processing
    - Hybrid retrieval combining Qdrant-native dense (Gemini embeddings) and BM25 search with reciprocal rank fusion and optional Cohere reranking
    - Parent-child chunking with deterministic Qdrant vector IDs and metadata-scoped retrieval
    - Token-budgeted context construction with parent-context expansion for grounded generation
    - Streaming Next.js chat interface with SSE, request idempotency, and conversation-history handling
    - LangSmith-powered evaluation pipeline for retrieval, citation, evidence-support, and answer-quality metrics

### 5. Scholar — Grounded, Cited RAG Q&A Over Research Papers

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Python, FastAPI, SSE, Qdrant, BAAI/bge-large, bge-reranker, PostgreSQL, Celery, Redis, Rust, Next.js, Docker
- **Core Features & Architecture:**
    - Two-stage server-side abstention gate for retrieval decisions, improving abstention accuracy from 0.77 to 0.97
    - Cross-encoder reranking with BAAI/bge-reranker, increasing MRR from 0.78 to 0.82
    - Prompt rewrite module for fact-recall optimization, raising accuracy from 0.82 to 0.88 with zero invalid citations
    - Custom A/B evaluation harness for recall@k, MRR, fact-recall, and citation correctness validation
    - Streaming answer generation with SSE for real-time user interaction

### 6. Centralised Knowledge RAG Chatbot

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** LangChain, LangGraph, Milvus, PostgreSQL, Reciprocal Rank Fusion, Cross-Encoder Reranking, BM25
- **Core Features & Architecture:**
    - Hybrid retrieval pipeline combining dense vector search (Milvus) with sparse BM25 and cross-encoder reranking
    - Custom LangGraph nodes enabling parallel Milvus retrieval across document collections with PostgreSQL metadata lookups for provenance
    - LLM-judge scoring system for answer quality evaluation and automated knowledge-gap detection
    - Document change-impact system flagging stale AI answers via real-time monitoring of document updates
    - Per-app usage analytics dashboard tracking retrieval performance and LLM response metrics

### 7. Contexo – AI Company Brain

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Next.js, Python, FastAPI, PostgreSQL, pgvector, Redis, Inngest, LangChain, RRF, RLS
- **Core Features & Architecture:**
    - Hybrid RAG pipeline combining pgvector semantic search and PostgreSQL full-text search with Reciprocal Rank Fusion (RRF)
    - Multi-tenant data isolation enforced via PostgreSQL Row-Level Security (RLS) and tenant-specific vector indices
    - Tool-calling LLM agents with real-time Server-Sent Events (SSE) streaming
    - Event-driven background workers (Inngest + Redis) for onboarding, meeting notes, policy propagation, and document analysis
    - Multiple retrievals across up to 4 tool rounds per user turn, with parallelized execution

### 8. Multi-Hop QA Agent

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** LangGraph, PEFT (LoRA), ColBERTv2, ONNX, PyTorch
- **Core Features & Architecture:**
    - Autonomous cyclical planning, retrieval, and synthesis loops using LangGraph for multi-hop reasoning
    - Fine-tuned DeBERTa-v3-large with rank-8 LoRA for hallucination-resistant fact verification
    - Quantized ColBERTv2 index for low-latency late-interaction retrieval with ONNX Runtime optimization
    - Differential AdamW learning rates for parameter-efficient fine-tuning on a 5.2M-document corpus
    - Hallucination guardrails with distractor rejection and query re-planning

### 9. PARA: Position-Aware Retrieval Augmentation

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Python, React, Node.js, Express, FastAPI, Groq, GitHub Actions
- **Core Features & Architecture:**
    - Multi-granularity RAG pipeline with sentence/paragraph/section chunking to mitigate the lost-in-the-middle effect
    - Sinusoidal position-bias correction for retrieval accuracy
    - Multi-provider LLM fallback across Groq, Gemini, OpenAI, and Anthropic
    - Component-wise ablation study identifying chunking as the dominant driver of retrieval performance
    - GitHub Actions CI/CD for pipeline validation

### 10. LIHTC KG-RAG Underwriting Agent

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Neo4j, LangGraph, DuckDB, Streamlit
- **Core Features & Architecture:**
    - Bronze/Silver/Gold (medallion) ingestion pipeline for the knowledge graph
    - Multi-stage agent pipeline with 13 tools
    - Dynamic ontology prompting for token efficiency
    - Deterministic Cypher repair for error reduction

### 11. Grounded – Self-Correcting RAG System

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Python, FastAPI, React, Ollama, BM25, NLP
- **Core Features & Architecture:**
    - Claim-level decomposition layer for granular fact-checking
    - Hybrid retriever combining BM25 and dense embeddings via Reciprocal Rank Fusion
    - Calibrated MiniCheck fact-verification model for hallucination detection
    - Automatic abstain mechanism for unsupported queries
    - CPU-only inference pipeline optimized via Ollama

### 12. RepoSage

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Python, LangGraph, Qdrant, FastAPI
- **Core Features & Architecture:**
    - Agentic RAG system for codebase questions
    - AST-aware chunking for code retrieval
    - Hybrid retrieval combining dense and BM25
    - Selective self-RAG loop for improved accuracy
    - Evaluation harness with LLM-judged faithfulness

### 13. TrustRAG — Secure Enterprise AI & Access Governance Suite

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** LangChain, ChromaDB, OpenAI API, Python, Streamlit, SHA-256
- **Core Features & Architecture:**
    - Tiered Role-Based Access Control (RBAC) integrated directly into vector store metadata filtering
    - Inline threat firewall using keyword rules and vector similarity for prompt injection and jailbreak detection
    - Just-In-Time (JIT) access delegation workflow with time-expiring document permissions
    - Tamper-evident audit logging using chained SHA-256 hashes for query and security event tracking

### 14. PragnaAI (3D Vector Database & Visualizer)

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** C++17, React, Node.js, Express, Ollama, HTML5 Canvas
- **Core Features & Architecture:**
    - Custom HNSW graphs and KD-Trees implemented in C++17 for high-performance vector search
    - Concurrent Node.js API gateway managing C++ database process lifecycles
    - Client-side 3D PCA projection using SVD Power Iteration and Gram-Schmidt Deflation
    - Local Ollama models for an offline, zero-data-leakage RAG pipeline

### 15. Hybrid RAG Pipeline for Document QA (AdHyRAG)

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Python, Mistral-7B, FAISS, BM25, QLoRA, FastAPI, Docker, Azure
- **Core Features & Architecture:**
    - Hybrid retrieval combining FAISS (dense) and BM25 (sparse) with Reciprocal Rank Fusion for improved Recall@5
    - Cross-encoder reranking and NLI-based faithfulness verification to mitigate hallucinations
    - QLoRA fine-tuning of Mistral-7B for domain-specific accuracy gains (22% improvement)
    - Modular FastAPI REST API with Dockerized deployment on Azure App Service

### 16. Enterprise Grounded RAG & Compliance QA Platform

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Python, FastAPI, ChromaDB, SentenceTransformers, SQLite
- **Core Features & Architecture:**
    - Two-stage retrieval pipeline combining dense vector search (ChromaDB) and Cross-Encoder reranking
    - Fine-tuned SentenceTransformers embeddings on 7,000+ question-passage pairs for domain-specific semantic matching
    - FastAPI backend with confidence-based filtering and SQLite audit logging for compliance traceability
    - Multi-format document ingestion with chunking and metadata handling

### 17. Physarum-Inspired Graph Reranking for RAG

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Sentence Transformers, Cross-Encoder, NLI, SQuAD v2, MS MARCO
- **Core Features & Architecture:**
    - Graph-based reranking using Physarum-inspired evidence propagation to model inter-document relationships
    - Hybrid relevance scoring combining dense similarity (Sentence Transformers) and Cross-Encoder scores
    - Negative evidence filtering via Natural Language Inference (NLI)
    - Optimized inference with ~16 ms added latency for graph propagation
    - Benchmarked on SQuAD v2 and MS MARCO

### 18. StateFlow

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** LangGraph, CRAG, Self-RAG, PostgreSQL, Docker, ChromaDB, BM25, LangSmith, RAGAS
- **Core Features & Architecture:**
    - Cyclic LangGraph FSM with 8 modular nodes
    - CRAG pre-generation gating and Self-RAG hallucination auditing
    - Hybrid RRF retrieval layer (60% ChromaDB + 40% BM25)
    - PostgreSQL checkpointing
    - Full LangSmith tracing and RAGAS validation

### 19. Centura: Compliance & Marketing Checker

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** TypeScript, Pinecone, YOLO-VLM, Flask, OpenAI, HuggingFace, Vercel, OnRender
- **Core Features & Architecture:**
    - Semantic search pipeline using Pinecone for regulatory document retrieval across 7 compliance stages (ASCI/AMFI/NSE/BSE).
    - Multimodal content analysis with YOLO-VLM for image/video classification integrated with rule-based scoring engines.
    - Document parsing backend with Flask APIs handling unstructured data (scripts, images, videos) via HuggingFace transformers.
    - Version-controlled ticketing system with dashboards for compliance workflow orchestration.
    - Hybrid retrieval system combining vector search (Pinecone) with LLM-based reranking for precision compliance checks.

### 20. RAG Chatbot for RecipeDb

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Python, Transformers, LLMs, HuggingFace, AWS, ECS, Fargate
- **Core Features & Architecture:**
    - Custom BERT-based NER model fine-tuned on 6,800+ recipe examples (15 entity classes, 2,500+ vocabulary) for ingredient extraction.
    - Vector search pipeline integrated with LLM for RAG, achieving <500ms response latency.
    - Containerized deployment on AWS ECS with Fargate for auto-scaling to handle 10,000+ daily queries.
    - End-to-end pipeline from transformers → vector search → API integration.

### 21. Connecting the Dots

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** Neo4j, LangChain, React.js, FastAPI, YOLOv8, EasyOCR, Adobe PDF Embed API, Docker
- **Core Features & Architecture:**
    - Multi-stage document parsing pipeline using YOLOv8 for layout analysis and EasyOCR for text extraction from unstructured PDFs
    - Neo4j knowledge graph for entity-relationship modeling of extracted content
    - LangChain-based RAG pipeline with persona-driven retrieval augmentation for semantic search
    - Adobe PDF Embed API integration for interactive document rendering in the frontend
    - FastAPI backend for orchestrating retrieval, graph queries, and Q&A generation
    - Dockerized microservices for scalable deployment of parsing, embedding, and retrieval components

### 22. Intelligent E-commerce Search Engine

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** React, Node.js, Python, MongoDB, ChromaDB, Redis, Elasticsearch, Docker
- **Core Features & Architecture:**
    - Semantic search pipeline using ChromaDB embeddings and cross-encoder reranking for relevance
    - Autosuggest system with Elasticsearch for typo tolerance, fuzzy matching, and abbreviation expansion
    - Real-time personalization via Redis for dynamic reranking based on user behavior
    - Containerized microservices (frontend, API, ML service, indexer) with MongoDB, ChromaDB, and Elasticsearch
    - Scalable deployment architecture with Docker for microservices orchestration

### 23. Akasa

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** RAG, Pathway, Streamlit, OpenAI API, Python, Docker
- **Core Features & Architecture:**
    - Real-time streaming data ingestion pipeline using Pathway for continuous indexing of tickets and documents
    - RAG-powered LLM retrieval system with hybrid search and fallback mechanisms for improved response accuracy
    - RESTful API layer for seamless integration with external tools (e.g., Slack bot)
    - Interactive UI built with Streamlit for user-facing interactions
    - Dockerized deployment for scalability and reliability

### 24. Agentic RAG Framework for Software Engineering

- **Domain:** Generative AI → RAG & Knowledge Retrieval
- **Tech Stack:** HuggingFace, PyTorch, Pathway, LangChain, FAISS
- **Core Features & Architecture:**
    - Multi-agent system with query decomposition and memory management
    - Specialized agents for code generation, correction, and mathematical reasoning
    - Adaptive RAG (shallow, deep, hybrid) and T5-based Corrective RAG for enhanced retrieval
    - Benchmarking using curated dataset of 180 SDE tasks

---

## AI Agents & Multi-Agent Systems (22)

### 1. Agentica

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** Azure OpenAI, C++, Agentic AI, LLMs
- **Core Features & Architecture:**
    - Multi-agent orchestration layer with replanning capabilities
    - Sequence-aware execution engine for complex workflows
    - Tool orchestration framework for task delegation
    - Adaptive frame-sampling algorithm for video processing
    - Multimodal embedding integration for semantic retrieval

### 2. AI-Powered Browser Agent

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** Python, FastAPI, PostgreSQL, pgvector, Redis, MCP, Sentence Transformers, Chrome Extension
- **Core Features & Architecture:**
    - Planner/executor/observer/orchestrator agentic loop for goal decomposition and failure recovery
    - Persistent memory layer using pgvector for cross-session semantic retrieval
    - Redis-backed working memory for session-scoped multi-step context
    - BeliefState system for conflict resolution and source authority tracking
    - Regression suite with adversarial testing for failure mode mitigation

### 3. Conversational AI Financial Assistant

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** Java, RPC, Agentic AI, Python, Google Protobuf
- **Core Features & Architecture:**
    - Multi-tool agentic system with 6 specialized tools for autonomous retrieval and diagnosis
    - Dynamic intent-routing framework with on-demand capability loading
    - LLM-as-a-judge evaluation system for automated response validation
    - Data transformation layer converting complex backend data into AI-readable formats

### 4. Loom – Agentic AI Email Orchestration System

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** Python, FastAPI, React, LangGraph, OpenAI, Supabase, LangSmith
- **Core Features & Architecture:**
    - Stateful LangGraph orchestration for multi-step task planning
    - Action-level guardrails for tool execution safety
    - SSE-based streaming for real-time progress updates
    - Multi-account Gmail integration with OAuth 2.0 and token lifecycle management

### 5. Automated Agentic E-Commerce Management System

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** LangGraph, MCP, FastAPI, PostgreSQL, Qdrant, Docker, Langfuse
- **Core Features & Architecture:**
    - Multi-agent assistant with router-orchestrator architecture and parallel domain agents for cross-domain analysis
    - MCP-based tool calling for operational data retrieval from PostgreSQL and semantic search via Qdrant
    - Human-in-the-Loop approval for sensitive business actions
    - Dockerized FastAPI/Next.js services with Langfuse for LLM observability
    - Reflection loops for root-cause analysis and insight aggregation

### 6. Dynamic Multi-Agent Orchestration Engine

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** Python, REINFORCE, LLM APIs, custom async runtime
- **Core Features & Architecture:**
    - REINFORCE-trained centralized orchestrator dynamically routing tasks to relevant agents at inference time
    - Custom LLM Critic injecting dense per-step reward signals into the policy gradient for faster convergence
    - Hot-swappable Dynamic Agent Registry with adversarial dissent mechanism for consensus validation
    - Async runtime managing agent lifecycles and task parallelization

### 7. NexusChat AI Workspace (Dual-Microservices Agentic AI Platform)

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** LangGraph, LangChain, GPT-4o, ChromaDB, PostgreSQL, MongoDB Atlas, Socket.IO, FastAPI, MCP SDK
- **Core Features & Architecture:**
    - Dual-microservice architecture for real-time human-agent collaboration with LangGraph agents executing 5+ MCP tools
    - CRAG pipeline: ChromaDB retrieval → LLM relevance grading (0.0–1.0) → Tavily web fallback
    - Passive vectorization of conversations into long-term agent memory
    - Token-level SSE streaming bridged via Socket.IO with <500ms TTFB and 3-state read receipts
    - Persistent agent memory via PostgreSQL checkpointing and LangSmith tracing across 3 databases

### 8. Autonomous AI Coding Agent

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** Python, ReAct, MCTS, SQLite, ChromaDB, Docker
- **Core Features & Architecture:**
    - Custom Planner-Worker multi-agent framework with ReAct reasoning and MCTS-powered hierarchical task execution
    - Secure Docker sandbox for autonomous code execution with self-healing recovery loop
    - Tiered memory using SQLite (short-term) and ChromaDB (semantic RAG) with asynchronous SLM compression
    - Thread-safe memory truncation and context-window token optimization (~80% reduction)

### 9. Multi-Agent Customer Support Resolution

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** LangGraph, Next.js, Express.js, SQLite, Docker
- **Core Features & Architecture:**
    - LangGraph orchestration of nested sub-agents with persistent execution traces and audit history
    - Deterministic fallback execution and human-in-the-loop escalation
    - SSE streaming for real-time ticket monitoring and workflow visualization
    - Configurable knowledge bases, FAQs, and tool definitions
    - Task routing across intent classification, investigation, severity assessment and response synthesis agents

### 10. Enterprise AI Workflow Orchestrator

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** LangGraph, Temporal, Kafka, Azure OpenAI, PostgreSQL, Spring Boot
- **Core Features & Architecture:**
    - Multi-agent pipelines with configurable retries, checkpointing, and parallel execution
    - Fault-tolerant distributed execution engine integrating LangGraph, Kafka, and Temporal
    - LLM agent coordination with enterprise APIs and external tools
    - Observability: execution traces, latency analytics, token usage, and cost monitoring
    - Long-running workflow support with state management

### 11. Hire-AI — Multi-Agent AI Recruitment Platform

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** React.js, FastAPI, PostgreSQL, Redis, LangGraph, Groq, LLaMA 3.3 70B, JWT, RBAC, SSE
- **Core Features & Architecture:**
    - Six specialized LLM personas (Architect, Culture Expert, Risk Monitor, etc.) in a LangGraph debate-based evaluation
    - Parallel async pipeline processing 500+ candidates per batch in under 3 minutes
    - Cost-optimized LLaMA 3.3 70B with selective enrichment and anti-hallucination guardrails
    - Redis caching of intermediate agent outputs and in-memory PDF parsing
    - Real-time SSE streaming of evaluation updates

### 12. JARVIS — Personal AI Agent

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** Python, ChromaDB, Whisper, liteLLM, OpenRouter, AppleScript
- **Core Features & Architecture:**
    - Central LLM orchestrator building dependency-ordered execution plans
    - Four specialized agents (PC Control, Research, Task, Memory) with distinct tools
    - Two-tier ChromaDB memory (semantic + episodic) injected at inference time
    - Offline wake-word detection, VAD-based capture and Whisper transcription
    - Dynamic LLM routing via liteLLM (Llama-3.3-70B, Qwen3-Coder, DeepSeek per task)
    - Destructive-command gating for OS-level safety

### 13. Chaos Co-Pilot — Kubernetes Fault Intelligence Platform

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** FastAPI, Groq LLaMA 3, Prometheus, Chaos Mesh, Docker, Kubernetes, Helm, scikit-learn, NetworkX, WebSockets
- **Core Features & Architecture:**
    - Dual-LLM pipeline (Analyser + Narrator) with fingerprint-based deduplication to avoid redundant API calls
    - Real-time NetworkX causal dependency graph for cross-service root-cause reasoning
    - Parallel agent system for concurrent Kubernetes pod monitoring with fault isolation
    - Per-agent severity classification fed into LLM context

### 14. Code Ripple AI

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** LangGraph, LangChain, Gemini API, ChromaDB, MongoDB, Node.js, Express.js, Babel AST, Octokit, React
- **Core Features & Architecture:**
    - Planner, router and reflection agents coordinated by LangGraph for pull-request risk scoring
    - Semantic RAG over full-repository context using ChromaDB and MongoDB
    - GitHub App webhooks via Octokit for real-time inline review feedback
    - Babel AST dependency impact graphing across changed files
    - Dashboard for code quality metrics, review history and dependency graphs

### 15. Agentic Banking Management System

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** LangGraph4j, LangChain4j, Azure OpenAI, MCP, Spring Boot, Docker, Azure Document Intelligence
- **Core Features & Architecture:**
    - Supervisor Agent routing to specialized Account, Transaction, and Payment Agents
    - MCP-based standardized banking tools with Azure OpenAI tool calling
    - Azure Document Intelligence for invoice extraction via a ScanInvoice tool
    - Spring Boot microservices, Docker, and Azure deployment
    - Application Insights for distributed tracing and diagnostics

### 16. FlowGraphs (Visual AI Pipeline Orchestration SaaS)

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** LangGraph, LangChain, GPT-4o-mini, Redis, Socket.IO, FastAPI, Prisma, PostgreSQL
- **Core Features & Architecture:**
    - Drag-and-drop React Flow canvas compiled into LangGraph state graphs
    - Node.js API Gateway (JWT + Prisma) decoupling PostgreSQL from the AI engine
    - Redis Pub/Sub + Socket.IO streaming of execution states with <10ms latency
    - asyncio auto-parallelization of LangGraph nodes, cutting latency by up to 50%
    - Multi-tier SaaS deployed on Vercel, Render, and Hugging Face

### 17. TripMate AI – Multi-Agent Planner

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** Python, FastAPI, LangGraph, Groq, MCP, Docker, PostgreSQL
- **Core Features & Architecture:**
    - Stateful multi-agent system with supervisor routing across 5 specialist agents
    - Decoupled Model Context Protocol (MCP) client-server architecture for external APIs
    - Human-in-the-Loop workflows with interrupt/resume states
    - PostgresSaver checkpoint persistence on a serverless database

### 18. ReviewSentinel

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** FastAPI, Redis, Docker, Kubernetes
- **Core Features & Architecture:**
    - Autonomous multi-agent PR review bot with reviewer and exploration sub-agents
    - Multi-provider LLM routing with token spend limits
    - HMAC-verified webhooks and Kubernetes Job sandboxes

### 19. Triage Wars — Multi-Agent Disaster Response Simulation

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** Python, FastAPI, Hugging Face, Docker, GRPO
- **Core Features & Architecture:**
    - Multi-agent RL environment for autonomous decision making under partial observability
    - Multi-signal reward system for agent coordination
    - GRPO fine-tuning for policy optimization
    - JSON-based control API for real-time interaction
    - Dockerized deployment on Hugging Face Spaces

### 20. CoFound — Multi-Agent Startup Knowledge Graph

- **Domain:** Generative AI → AI Agents & Multi-Agent Systems
- **Tech Stack:** FastAPI, React Flow, MongoDB Atlas, Gemini 2.5 Pro, Gemini 2.0 Flash, Firecrawl, SSE, Regex
- **Core Features & Architecture:**
    - Knowledge-graph architecture using React Flow and FastAPI
    - Fan-out orchestration: Gemini 2.5 Pro controller with parallel Gemini 2.0 Flash researchers
    - Automated draft-critique-rewrite loops scored on evidence density and hedging
    - Deterministic fabrication check: regex claim extraction matched verbatim against source payloads to block invalid commits
    - Real-time progress via SSE

### 21. SQL Agentic System

- **Domain:** Generative AI → AI Agents & Tool Use
- **Tech Stack:** Spring Boot, Java 17, MongoDB, Pinecone, FastAPI, Python, LangGraph, LangChain RAG
- **Core Features & Architecture:**
    - Multi-step agentic workflow using LangGraph for SQL query generation, self-correction, and explanation synthesis
    - Hybrid vector + metadata indexing in Pinecone for semantic search over database schemas
    - FastAPI microservice for orchestrating LLM-driven SQL query refinement and result visualization
    - Spring Boot backend managing user sessions, metadata, and vector embeddings at scale
    - Integration of LangChain RAG for retrieving relevant schema context before query execution
    - Dynamic chart suggestion pipeline triggered by query results

### 22. AI Meeting Scheduler

- **Domain:** Generative AI → AI Agents & Tool Use
- **Tech Stack:** LangChain, DeepSeek R1, Flask, AMD MI300X, python-dateutil, Natural language parsing
- **Core Features & Architecture:**
    - LangChain-orchestrated agentic workflow for meeting scheduling with multi-step reasoning (participant extraction, duration parsing, constraint resolution)
    - DeepSeek R1 fine-tuned for unstructured email parsing with 92% accuracy in structured output extraction
    - GPU-optimized inference on AMD MI300X (40% faster token generation at 180 tokens/sec vs. CPU)
    - Natural language date parsing pipeline (e.g., "next Thursday") with 96% temporal accuracy using 'python-dateutil'
    - Flask backend integrating tool-use capabilities for calendar API interactions (implied by scheduling automation)

---

## LLM Fine-tuning & Alignment (13)

### 1. Multimodal Product Inspection AI – Fine-Tuned VLM

- **Domain:** Generative AI → LLM Fine-tuning & Alignment
- **Tech Stack:** Python, PyTorch, HuggingFace Transformers, PEFT (LoRA), BitsAndBytes, Qwen2-VL-2B-Instruct, Gradio
- **Core Features & Architecture:**
    - LoRA/PEFT fine-tuning of Qwen2-VL-2B-Instruct for structured defect-inspection reports from images
    - Instruction fine-tuning on multimodal image-text pairs with a defined report schema
    - Low-bit quantization (BitsAndBytes) cutting inference memory ~4x for consumer GPUs
    - Gradio app deployed on Hugging Face Spaces
    - Prompt design to reduce hallucinated or unstructured outputs

### 2. Financial LLM Abstention & Reasoning Evaluation

- **Domain:** Generative AI → LLM Fine-tuning & Alignment
- **Tech Stack:** Python, PyTorch, LLM, LoRA, QLoRA, SFT
- **Core Features & Architecture:**
    - Specialized financial reasoning dataset of 3,521 MCQs
    - Abstention-focused evaluation framework to reduce hallucinations
    - Zero-shot benchmarking of Gemma-2-9B, Qwen-7B, and Mistral-7B
    - LoRA and QLoRA fine-tuning
    - Comparative analysis of accuracy and reasoning quality

### 3. Athena – Offline RAG Assistant & Fine-Tuned LLM

- **Domain:** Generative AI → LLM Fine-tuning & Alignment
- **Tech Stack:** Python, PyTorch, Hugging Face, QLoRA, ChromaDB, LangChain, 4-bit quantization
- **Core Features & Architecture:**
    - QLoRA fine-tuning of a 1.1B-parameter TinyLlama model
    - 4-bit quantization for deployment on 4GB VRAM
    - Offline RAG pipeline with ChromaDB and LangChain
    - Inference stack tuned for reduced memory footprint (~65% reduction)

### 4. HireSignal

- **Domain:** Generative AI → LLM Fine-tuning & Alignment
- **Tech Stack:** Python, RLHF, QLoRA, Gradio, Qwen2
- **Core Features & Architecture:**
    - Recruiting assistant with JD analyzer, fit scorer and resume tip generator modules
    - SFT + RLHF/PPO fine-tuning pipeline on Qwen2-1.5B-Instruct
    - Model selection optimized for 8GB RAM constraints

### 5. The Small Coder

- **Domain:** Generative AI → LLM Fine-tuning & Alignment
- **Tech Stack:** Python, PyTorch, Hugging Face Transformers
- **Core Features & Architecture:**
    - Multi-stage SFT + RLHF pipeline
    - Knowledge distillation into a small code model
    - Sequence-level loss optimization

### 6. Short Story Generation (LLM Trained from Scratch)

- **Domain:** Generative AI → LLM Fine-tuning & Alignment
- **Tech Stack:** PyTorch, Hugging Face, Custom BPE Tokenizer
- **Core Features & Architecture:**
    - Decoder-only Transformer trained from scratch on 330M tokens with a custom BPE tokenizer
    - Binary shard storage for high-throughput streaming and full token utilization
    - Instruction fine-tuning with response-only loss masking on synthetic datasets
    - LLM-as-judge evaluation (Claude Opus 4.6) for grammar, consistency and coherence
    - Single-GPU training (RTX 4060 Ti), validation perplexity 4.35, BERTScore F1 0.869

### 7. SanskritLM

- **Domain:** Generative AI → LLM Fine-tuning & Evaluation
- **Tech Stack:** Unsloth, QLoRA, LLaMA 3.1 8B, Mistral v0.3 7B
- **Core Features & Architecture:**
    - Fine-tuned LLaMA 3.1 8B and Mistral v0.3 7B models using QLoRA for efficient parameter-efficient fine-tuning
    - Applied Unsloth library to optimize memory and compute requirements during training
    - Achieved distinct training losses (0.87 for LLaMA, 0.43 for Mistral) on Sanskrit datasets from Rigveda and Bhagwad Gita
    - Leveraged low-rank adaptation to reduce memory footprint while maintaining model performance

### 8. SQL-Craft

- **Domain:** Generative AI → LLM Fine-tuning & Evaluation
- **Tech Stack:** PyTorch, Hugging Face Transformers, LoRA, QLoRA
- **Core Features & Architecture:**
    - Parameter-efficient fine-tuning (LoRA/QLoRA) of T5-Small, BART-Large, FLAN-T5-Base, and GPT-2-Medium on synthetic SQL generation dataset
    - End-to-end training pipeline with tokenization, training loops, and evaluation metrics (Rouge, exact match, execution accuracy)
    - Reduction of GPU memory usage by up to 70% while maintaining >95% accuracy compared to full fine-tuning

### 9. ARES (Agentic Response Evaluation System)

- **Domain:** Generative AI → LLM Fine-tuning & Evaluation
- **Tech Stack:** Python, Hugging Face, Transformers, PEFT, TRL, PyTorch, LoRA, Gemini 2.5 Pro API, SQLite
- **Core Features & Architecture:**
    - Teacher-student model architecture for automated evaluation
    - Resilient data pipeline for generating labeled evaluation datasets
    - Fine-tuning of student LLM (Gemma 3B) using PEFT/LoRA
    - Implementation of 4-bit quantization for efficient model deployment
    - Automated evaluation workflow replacing manual processes

### 10. Prompt-to-MIDI Generation

- **Domain:** Generative AI → LLM Fine-tuning & Evaluation
- **Tech Stack:** PyTorch, TensorFlow, LoRA, Flan-T5 Small, midiTok
- **Core Features & Architecture:**
    - LoRA fine-tuning adapter matrices (rank=8) integrated into Flan-T5 Small to reduce trainable parameters by 99% (77.6M→688K)
    - MIDI tokenization pipeline using miditok to map text prompts into structured music tokens for beat generation
    - GPU memory optimization via parameter-efficient fine-tuning to sustain computational efficiency at scale
    - Groove MIDI dataset used for supervised fine-tuning with structured music token alignment

### 11. Evaluation of Large Reasoning Models on Graph Coloring Problem

- **Domain:** Generative AI → LLM Fine-tuning & Evaluation
- **Tech Stack:** Python, LLMs, NVIDIA DGX
- **Core Features & Architecture:**
    - Pipeline for large-scale symbolic computation and dataset generation
    - SAT-solver-based Python pipeline for ground truth computation
    - Edge preprocessing and constraint generation for graph inputs
    - Evaluation framework for reasoning capabilities of state-of-the-art LLMs

### 12. IndicGuard

- **Domain:** Generative AI → LLM Fine-tuning & Evaluation
- **Tech Stack:** Python, Llama-3.2-1B, QLoRA
- **Core Features & Architecture:**
    - Dual-head transformer architecture for multilingual classification
    - Fine-tuning using QLoRA for efficient parameter updates
    - Full-stack application with real-time inference API

### 13. Wanda Pruning Pipeline

- **Domain:** Generative AI → LLM Fine-tuning & Evaluation
- **Tech Stack:** Python
- **Core Features & Architecture:**
    - Memory-efficient Wanda pruning for 3.2B Llama-3.2-3B model
    - Weight pruning with minimal impact on generation quality
    - Specialized for Indic language models

---

## Multimodal & Diffusion Models (11)

### 1. IntelliDoc AI – Vision Language Model for Intelligent Document Understanding

- **Domain:** Generative AI → Multimodal & Diffusion Models
- **Tech Stack:** Qwen2-VL, PEFT (LoRA), PyTorch, Transformers, Hugging Face, FastAPI, OpenCV, EasyOCR
- **Core Features & Architecture:**
    - LoRA fine-tuning of Qwen2-VL for document-specific multimodal understanding
    - Pipeline integrating OCR enhancement, visual question answering and structured extraction
    - FastAPI inference services for real-time identity verification with confidence scoring
    - Hyperparameter tuning and benchmarking for document classification accuracy

### 2. Palette-Conditioned Art Generation

- **Domain:** Generative AI → Multimodal & Diffusion Models
- **Tech Stack:** ControlNet, PyTorch, Stable Diffusion v1.5
- **Core Features & Architecture:**
    - Custom ControlNet branch fine-tuned for palette adherence using K-Means colors from the ArtCap dataset
    - Conditioning signals encoded as horizontal stripe patterns
    - Random prompt-dropping strategy to enforce palette adherence (34.2% improvement)
    - Custom Palette Adherence Metric and ablation studies

### 3. Vision Search Engine

- **Domain:** Generative AI → Multimodal & Diffusion Models
- **Tech Stack:** Python, CLIP, BLIP-2, YOLOv8, FastAPI, Streamlit, HNSW
- **Core Features & Architecture:**
    - Multimodal embedding fusion of CLIP (image) and BLIP-2 (captions)
    - Custom YOLOv8 fine-tuning for fashion product detection and cropping
    - BLIP-ITM cross-modal re-ranking of HNSW search results
    - FastAPI microservice for upload, detection and vector search

### 4. Multimodal VQA with ABO Dataset

- **Domain:** Generative AI → Multimodal & Diffusion Models
- **Tech Stack:** BLIP, LoRA, Hugging Face, PEFT, Transformers
- **Core Features & Architecture:**
    - LoRA fine-tuning of BLIP models for VQA on the Amazon Berkeley Objects dataset
    - PEFT fine-tuning across 13 BLIP variants with custom prompt engineering
    - FP16 precision with KV caching to reduce GPU memory and latency
    - Hugging Face-hosted inference under real-time constraints
    - Evaluation on 5+ standard VQA metrics

### 5. MR. Video — Distributed Multimodal Long Video Understanding

- **Domain:** Generative AI → Multimodal & Diffusion Models
- **Tech Stack:** Python, LLaMA, Asyncio, Ollama
- **Core Features & Architecture:**
    - Distributed MapReduce framework for long-video question answering
    - Motion-aware filtering and caption deduplication to cut VLM API calls
    - Audio-visual transcript fusion for better QA accuracy
    - Recursive failure-aware reasoning for pipeline robustness

### 6. CoMixGen: Poem-to-Image Generation

- **Domain:** Generative AI → Multimodal & Diffusion Models
- **Tech Stack:** GPT, Long-CLIP, Diffusion Models
- **Core Features & Architecture:**
    - EPE segmentation module
    - Multi-Stage Prompt Refinement (MSPR) loop
    - Diffusion-based image synthesis with Consistent Self-Attention

### 7. EEG-to-Image Generation Pipeline

- **Domain:** Generative AI → Multimodal & Diffusion
- **Tech Stack:** Python, PyTorch, BiLSTM, CNN, U-Net, Stable Diffusion, CLIP, Diffusion Models
- **Core Features & Architecture:**
    - Multi-layer BiLSTM + CNN for spatiotemporal EEG feature extraction
    - Custom projection head mapping EEG embeddings to CLIP-L/14’s 768D latent space
    - Fine-tuned U-Net component of Stable Diffusion conditioned on EEG embeddings
    - Dual-loss training (U-Net + CLIP loss) for semantic alignment
    - Weighted average of real/segmented image embeddings (0.7/0.3) for semantic consistency

### 8. Large Language Models for Semantic Communications

- **Domain:** Generative AI → Multimodal & Diffusion
- **Tech Stack:** PyTorch, Transformers
- **Core Features & Architecture:**
    - Transformer-based architectures for text and image encoding with compression up to 0.07 bits per pixel
    - Integration of advanced latent denoiser models for improved image reconstruction
    - Transformer-based ML models for predicting and rectifying corrupted data (AWGN and other noise types)
    - Modular design for handling multimodal data (text + image) with noise resilience

### 9. Acoustic Scene Synthesis(Text-to-Sound Generative Model)

- **Domain:** Generative AI → Multimodal & Diffusion
- **Tech Stack:** Latent Diffusion Models, CLAP, VQ-VAE, HiFi-GAN, CUDA
- **Core Features & Architecture:**
    - Latent diffusion VQVAE-based CLAP model
    - High-fidelity audio generation
    - State-of-the-art text-to-sound synthesis

### 10. Multi-Task Deep Learning Framework for Automated Lung X-Ray Analysis

- **Domain:** Generative AI → Multimodal & Diffusion
- **Tech Stack:** PyTorch, Python
- **Core Features & Architecture:**
    - Engineered a domain-specific medical imaging pipeline for data preprocessing and disease-mask generation.
    - Implemented automated clinical QA pair creation for cross-modal training.
    - Developed a multi-task architecture integrating image segmentation, classification, and radiology report generation.
    - Optimized segmentation and classification modules for precise localization of pulmonary abnormalities.

### 11. Prompt to Story Video Generator

- **Domain:** Generative AI → Multimodal & Diffusion
- **Tech Stack:** GPT-2, PyTorch, HuggingFace, SpeechT5, Stable Diffusion, MoviePy, Diffusers
- **Core Features & Architecture:**
    - AI pipeline combining GPT-2 for text generation, SpeechT5 for speech synthesis, and Stable Diffusion for visuals
    - Fine-tuning of GPT-2 on 100K+ story samples for improved narrative quality
    - Training of SpeechT5 on CMU Arctic dataset for natural-sounding speech
    - Synthesis of video outputs using MoviePy and Diffusers

---

## LLMOps, Evaluation & Guardrails (6)

### 1. Distributed LLM Output Verification Pipeline

- **Domain:** Generative AI → LLMOps, Evaluation & Guardrails
- **Tech Stack:** FastAPI, Pydantic, Streamlit, Docker, LangGraph
- **Core Features & Architecture:**
    - Parallel evaluator services (factual, logical, completeness) assessing LLM outputs concurrently
    - Adjudicator service resolving evaluator disagreements into one structured verdict
    - Graceful degradation producing partial verdicts under failures or malformed outputs
    - Deduplication of overlapping flagged spans
    - Latency cut from 18s to 10s via parallel dispatch

### 2. Project Raze

- **Domain:** Generative AI → LLMOps, Evaluation & Guardrails
- **Tech Stack:** PyTorch, ROCm, FastAPI
- **Core Features & Architecture:**
    - Gradient-ascent machine unlearning on top LLM layers to remove PII/secrets without retraining
    - Membership inference via perplexity scoring, 8x faster on AMD MI300X (ROCm)
    - Model utility preserved while selectively erasing sensitive data

### 3. LLM-based Secure Code Generation Framework

- **Domain:** Generative AI → LLMOps, Evaluation & Guardrails
- **Tech Stack:** LLM, NLP, AST Analysis, Graph-based IRs, Logit Steering, Python
- **Core Features & Architecture:**
    - NLP combined with AST analysis and graph-based IRs for behavioral threat modeling
    - Capability-aware logit steering constraining token generation at the probability level
    - Decode-time interruption halting security-sensitive generation in real time
    - Bayesian capability-extraction module quantifying latent model capabilities

### 4. Automated AI Agent Security Testing Framework

- **Domain:** Generative AI → LLMOps, Evaluation & Guardrails
- **Tech Stack:** Python, LLMs, Regex & Pattern Matching, REST APIs
- **Core Features & Architecture:**
    - Modular multi-layer adversarial simulation (prompt injection, jailbreaks, privilege escalation)
    - CVSS-based risk scoring and automated reporting
    - LLM-driven attack scenario generation and detection
    - Testing time reduced from 4–6 hours to ~15 minutes

### 5. Structured Document Extraction Pipeline & Eval Harness

- **Domain:** Generative AI → LLMOps, Evaluation & Guardrails
- **Tech Stack:** Python, Pydantic, asyncio, LLM Tool Calling, pytest, GitHub Actions
- **Core Features & Architecture:**
    - Tool-calling LLM pipeline for structured extraction
    - asyncio batch runner with concurrency control, rate limiting and caching
    - Golden-set evaluation harness with field-level precision/recall
    - CI-integrated tests via GitHub Actions

### 6. Zero-Server AI Privacy Gateway

- **Domain:** Generative AI → LLMOps, Evaluation & Guardrails
- **Tech Stack:** JavaScript, IndexedDB, C++, WebAssembly
- **Core Features & Architecture:**
    - Client-side PII detection engine
    - C++ compiled to WebAssembly for fast in-browser inference (2.86ms)
    - Heuristic and regex sensitive-data filtering
    - IndexedDB placeholder vault for sanitization and restoration
    - DOM Mutation Observer to restore responses seamlessly

---

## Efficient Inference & Model Serving (2)

### 1. Shards — Distributed LLM Inference over WAN

- **Domain:** Generative AI → Efficient Inference & Model Serving
- **Tech Stack:** Python, llama.cpp, Tailscale, CUDA, Metal, ROCm, OpenAI-compatible REST
- **Core Features & Architecture:**
    - GPU memory pooling across heterogeneous machines
    - Model layer sharding across connected GPUs (CUDA, Metal, ROCm)
    - OpenAI-compatible REST gateway for the sharded backend

### 2. SemantiCache

- **Domain:** Generative AI → Efficient Inference & Model Serving
- **Tech Stack:** Python, Redis Vector Sets
- **Core Features & Architecture:**
    - Transport-layer semantic cache intercepting httpx traffic for OpenAI, Anthropic and Gemini SDKs
    - Redis Vector Sets with conversation-graph hashing
