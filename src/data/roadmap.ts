// Content transcribed from "GenAI Roadmap.pdf" (days renamed to topics).

export type RoadmapTopic = {
  id: number
  title: string
  concepts: string[]
  practice: string
  project: { name: string; description: string }
  checkpoint?: { label: string; evaluates: string[] }
}

export const ROADMAP: RoadmapTopic[] = [
  {
    id: 1,
    title: 'Introduction to LLMs',
    concepts: [
      'What a language model does: next-token prediction',
      'Tokens and tokenization',
      'Embeddings as vector representations of meaning',
      'Transformers and attention, conceptually',
      'Base models vs instruct and chat models',
      'Open-weight vs closed models',
      'Context windows and what happens when you exceed them',
      'Knowledge cutoffs',
      'Hallucination: why it happens and what it looks like',
      'Non-determinism and why the same prompt gives different answers',
      'Major providers and model families',
    ],
    practice:
      "Build an 'LLM Playground' notebook that sends the same prompt to 2-3 different models and compares their responses side by side. Note where they differ and where they agree.",
    project: {
      name: 'Model Comparison Notebook',
      description:
        'Send the same 5 prompts (a factual question, a summary, a creative task, a math problem, and something past the knowledge cutoff) to 2–3 models. Tabulate the answers, token counts, and where they disagree or hallucinate.',
    },
  },
  {
    id: 2,
    title: 'Prompt Engineering',
    concepts: [
      'Anatomy of a prompt: instruction, context, input, output format',
      'System prompts vs user prompts',
      'Zero-shot prompting',
      'Few-shot prompting and choosing good examples',
      'Chain-of-thought prompting',
      'Role and persona prompting',
      'Delimiters and structure for long inputs',
      'Specifying output format explicitly',
      'Common failure modes: ignored instructions, wrong format, drifting, refusals',
      'Iterating on a prompt systematically',
    ],
    practice:
      "Build a 'Prompt Template Library': 8-10 reusable templates for summarization, classification, extraction, rewriting, and code explanation, each with placeholders for dynamic input.",
    project: {
      name: 'Prompt Template Library',
      description:
        '10 reusable templates with {placeholders} for summarize, classify, extract, rewrite, translate, and explain-code. For each, save a bad first version and the improved version with a note on what changed.',
    },
  },
  {
    id: 3,
    title: 'LLM APIs & Integration',
    concepts: [
      'The chat completions request format: messages, roles',
      'Parameters: temperature, top_p, max_tokens, stop sequences',
      'Reading the response object',
      'Token usage in the response',
      'API keys and storing them in .env',
      'Streaming responses',
      'Error types: rate limits, timeouts, server errors, invalid requests',
      'Retries with exponential backoff',
      'Falling back to a second provider',
      'Building a thin wrapper so provider code lives in one place',
    ],
    practice:
      "Build a CLI 'Multi-Model Chatbot' that can call two different providers, with proper error handling, retries, and a fallback to the second provider if the first fails.",
    project: {
      name: 'CLI Chatbot with Fallback',
      description:
        'A terminal chat loop calling Provider A, falling back to Provider B on failure, with retries and exponential backoff, streaming output, and token usage printed after each reply. Keys in .env.',
    },
  },
  {
    id: 4,
    title: 'Structured Output & Function Calling',
    concepts: [
      'Why free-form text output breaks applications',
      'Asking for JSON and why it is unreliable alone',
      'JSON mode and structured output modes',
      'Defining schemas with Pydantic',
      'Validating and repairing model output',
      'Function and tool calling: how the model requests a call',
      'Defining tool schemas',
      'Executing the call and returning the result',
      'Handling multiple tool calls',
      'When the model calls the wrong tool or invents arguments',
    ],
    practice:
      "Build a 'Structured Extraction Tool': given unstructured text such as a job posting or invoice, return validated JSON matching a Pydantic schema. Handle and retry on validation failures.",
    project: {
      name: 'Invoice Extractor',
      description:
        'Paste invoice text, get back validated JSON (vendor, date, line items, total) matching a Pydantic schema. Retry with the validation error fed back into the prompt when parsing fails.',
    },
  },
  {
    id: 5,
    title: 'AI Pair Programming',
    concepts: [
      'How coding assistants use context from your editor',
      'Writing effective prompts for code generation',
      'Providing context: file structure, existing patterns, constraints',
      'Iterating on generated code instead of accepting the first output',
      'Reviewing AI-generated code: correctness, edge cases, security',
      'Where AI-generated code commonly goes wrong',
      'Deciding when to verify versus trust',
      'Using AI for unfamiliar languages and libraries',
    ],
    practice:
      'Using an AI coding assistant, build a small web app (expense tracker or quiz app) end to end. Keep a log of the prompts that worked, the prompts that failed, and every bug you had to fix in generated code.',
    project: {
      name: 'Quiz App (AI-assisted)',
      description:
        'Build a small quiz web app end to end with a coding assistant. Keep a log of prompts that worked, prompts that failed, and every bug you had to fix in the generated code.',
    },
  },
  {
    id: 6,
    title: 'Code Analysis & Refactoring with LLMs',
    concepts: [
      'Using an LLM to explain unfamiliar code',
      'Prompting for structured code review output',
      'Identifying bugs, style issues, and refactor opportunities',
      'Generating unit tests from source code',
      'Verifying generated tests actually test something',
      'Passing large files: chunking and summarizing strategies',
      'Limitations: no execution, no repo-wide context',
    ],
    practice:
      "Build a 'Code Review Script': pass a source file to an LLM via API and get back a structured review (bugs, style issues, suggested refactors) plus 3 generated unit tests. Run the tests and confirm they pass.",
    project: {
      name: 'Code Review Script',
      description:
        'Pass a Python file to the API, get back structured JSON (bugs, style issues, refactor suggestions) plus 3 pytest unit tests. Run the tests and confirm they actually pass.',
    },
  },
  {
    id: 7,
    title: 'LangChain Fundamentals',
    concepts: [
      'Why orchestration frameworks exist',
      'When raw API calls are the better choice',
      'Overview of LangChain, LlamaIndex, and Haystack',
      'LangChain installation and setup',
      'Core components: model wrappers, prompt templates, chains',
      'LCEL and composing steps with the pipe operator',
      'Output parsers for structured results',
      'Memory: conversation buffer and windowed memory',
      'Building a sequential chain',
    ],
    practice:
      "Build a 'Data Extraction Chain' in LangChain: take unstructured text, run it through a prompt template and output parser, and return structured JSON. Then add conversation memory and test a multi-turn exchange.",
    project: {
      name: 'Resume Parser Chain',
      description:
        'LangChain LCEL chain: prompt template → model → output parser returning structured JSON from resume text. Then add windowed conversation memory and test a 3-turn follow-up exchange.',
    },
  },
  {
    id: 8,
    title: 'Retrieval Augmented Generation - Part 1',
    concepts: [
      'Why RAG exists: knowledge cutoffs and private data',
      'Loading documents: PDFs, text, HTML',
      'Chunking strategies: fixed size, recursive, semantic',
      'Chunk size and overlap tradeoffs',
      'Embedding models and what an embedding represents',
      'Cosine similarity and nearest-neighbour search',
      'Vector databases: Chroma, FAISS, Pinecone',
      'Storing chunks with metadata',
      'Running a similarity search and inspecting results',
    ],
    practice:
      'Set up a vector database. Load 3-5 documents, chunk them, generate embeddings, and store them with metadata. Run similarity searches and inspect which chunks come back for different queries.',
    project: {
      name: 'Document Search Tool',
      description:
        'Load 5 PDFs, chunk them (try two chunk sizes), embed and store in Chroma with metadata. Run 5 similarity searches and inspect which chunks come back for each.',
    },
  },
  {
    id: 9,
    title: 'Retrieval Augmented Generation - Part 2',
    concepts: [
      'The full RAG pipeline: chunk, embed, store, retrieve, generate',
      'Prompt design for grounding answers in retrieved context',
      'Instructing the model to say when it does not know',
      'Citing sources and returning the chunks used',
      'Metadata filtering before retrieval',
      'Choosing how many chunks to retrieve',
      'Failure modes: wrong chunks retrieved, right chunks ignored, answers invented',
      'RAG versus fine-tuning: when each is appropriate',
    ],
    practice:
      "Build a 'Knowledge Base Q&A System' - upload your own documents, build the full RAG pipeline, and test it with 10 real questions including 2 the documents cannot answer. The system must return sources and must decline to answer when the context does not support one.",
    project: {
      name: 'Knowledge Base Q&A (Checkpoint 1)',
      description:
        "Full RAG pipeline over your own documents. Answers cite the source chunks and refuse when context doesn't support an answer. Test with 10 questions, 2 of them unanswerable.",
    },
    checkpoint: {
      label: 'Checkpoint Project 1 · RAG Skill Check',
      evaluates: ['LLM APIs', 'LangChain', 'Embeddings', 'Vector databases', 'RAG design'],
    },
  },
  {
    id: 10,
    title: 'Agent Systems',
    concepts: [
      'What makes an agent different from a chain',
      'The ReAct pattern: reasoning and acting in a loop',
      'Giving an agent tools and writing tool descriptions',
      'The agent loop: think, call tool, observe, repeat',
      'Stopping conditions and iteration limits',
      'Planning and multi-step reasoning',
      'Inspecting agent traces to debug behaviour',
      'Failure modes: loops, wrong tool choice, ignoring results',
      'Cost implications of agent loops',
      'Multi-agent systems, conceptually',
    ],
    practice:
      "Build a 'Research Assistant Agent' with access to a web search tool and a calculator. Test it with multi-step questions that require both tools. Read the trace and identify one place it reasoned poorly.",
    project: {
      name: 'Research Assistant Agent',
      description:
        'ReAct agent with a web search tool and a calculator, plus an iteration limit. Test with multi-step questions needing both tools; read the trace and note one bad reasoning step.',
    },
  },
  {
    id: 11,
    title: 'Generative Media - Images & Audio',
    concepts: [
      'Text-to-image models and how they differ from LLMs',
      'Prompt techniques for image generation: subject, style, composition',
      'Negative prompts and parameters',
      'Calling an image generation API',
      'Image sizes, formats, and costs',
      'Text-to-speech APIs and voice selection',
      'Combining LLM text generation with TTS',
      'Designing a multi-modal pipeline',
      'Practical use cases and limitations',
    ],
    practice:
      "Build an 'Image Generation Tool' that takes a product description and generates 3 mockup images. Then build a small pipeline that generates a script with an LLM and converts it to audio with a TTS API.",
    project: {
      name: 'Product Mockup Generator',
      description:
        'Take a product description, generate 3 images with different style prompts, then a second pipeline that writes a 30-second ad script with an LLM and converts it to audio with a TTS API.',
    },
  },
  {
    id: 12,
    title: 'Evaluation & Testing LLM Applications',
    concepts: [
      'Why manual spot-checking does not scale',
      'Building an evaluation dataset of inputs and expected behaviour',
      'Deterministic checks: format, schema, required fields, keywords',
      'LLM-as-judge: using a model to score outputs',
      'Writing a scoring rubric',
      'Measuring RAG separately: retrieval quality vs answer quality',
      'Regression testing when you change a prompt',
      'Tracing and logging every request and response',
      'Latency and reliability as part of quality',
    ],
    practice:
      'Build an evaluation harness for your Topic 9 RAG system: 15 test questions with expected answers, automated scoring for format and correctness, and a report showing pass rate. Change one prompt and re-run to see the effect.',
    project: {
      name: 'RAG Eval Harness',
      description:
        '15 test questions with expected answers, deterministic checks (format, required fields) plus LLM-as-judge scoring, and a pass-rate report. Change one prompt and re-run to compare.',
    },
  },
  {
    id: 13,
    title: 'Cost, Limits & Production Concerns',
    concepts: [
      'How token-based pricing works: input vs output',
      'Estimating and measuring cost per request',
      'Counting tokens before sending',
      'Choosing a cheaper model for simpler steps',
      'Caching repeated requests',
      'Reducing prompt size: trimming context and history',
      'Rate limits, quotas, and queuing',
      'Latency, streaming, and perceived speed',
      'Prompt injection and why user input is untrusted',
      'Not leaking API keys or system prompts',
      'Handling and logging failures in production',
    ],
    practice:
      'Add cost and token tracking to your Topic 9 RAG system: log tokens and estimated cost per request, add response caching, and produce a report on where the money goes. Then attempt a prompt injection against it and note what happens.',
    project: {
      name: 'Cost Dashboard',
      description:
        'Add token counting, per-request cost logging, and a response cache to your RAG system. Produce a report on where the spend goes, then attempt a prompt injection and document what happened.',
    },
  },
  {
    id: 14,
    title: 'Final Project - Plan & Build',
    concepts: [
      'Choosing a project scope that fits the time',
      'Designing the pipeline before coding',
      'Deciding what needs an LLM and what does not',
      'Project structure: services, prompts, config',
      'Keeping prompts in files rather than hardcoded',
      'Error handling on every API call',
      'Building a simple interface with Streamlit',
      'Testing against your evaluation set',
    ],
    practice:
      'Plan and build your final project: a Document Intelligence Assistant, a Research Report Generator, or a Support Knowledge Bot. It must combine retrieval, structured output, and at least one tool or agent step, with a Streamlit interface and an evaluation set.',
    project: {
      name: 'Document Intelligence Assistant',
      description:
        'Streamlit app combining retrieval, structured output, and one tool/agent step. Prompts stored in files, error handling on every API call, tested against your evaluation set.',
    },
  },
  {
    id: 15,
    title: 'Deployment',
    concepts: [
      'Environment variables and secrets in production',
      'Never shipping API keys to the client',
      'Deploying a Streamlit app to Streamlit Community Cloud',
      'Deploying a Flask or FastAPI service to Render or Railway',
      'requirements.txt and dependency pinning',
      'Persisting the vector database across restarts',
      'Setting usage limits to prevent runaway cost',
      'Basic access control on a public demo',
      'Logging and monitoring after deploy',
      'Reading deploy logs and common failures',
      'Writing a README with setup steps, architecture, and screenshots',
    ],
    practice:
      'Deploy your final project with secrets configured correctly and a usage limit in place. Push to GitHub with a complete README covering setup, architecture, and example outputs. Share the live link.',
    project: {
      name: 'Deploy the Assistant',
      description:
        'Streamlit Community Cloud with secrets configured, a persisted vector store, a usage limit, basic access control, and a README covering setup, architecture, and example outputs.',
    },
  },
]
