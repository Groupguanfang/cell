import { Type, Expose } from 'class-transformer';
import { AnthropicMessage } from './message';

/**
 * Tool description.
 */
export class Tool {
    /**
     * The name of the tool.
     */
    name: string;

    /**
     * A description of the tool.
     */
    description: string;

    /**
     * The input schema of the tool.
     */
    inputSchema: Record<string, any>;

    constructor(name: string, description: string, inputSchema: Record<string, any>) {
        this.name = name;
        this.description = description;
        this.inputSchema = inputSchema;
    }
}

/**
 * Metadata about the request.
 */
export class Metadata {
    /**
     * An external identifier for the user who is associated with the
     * request. This should be a uuid, hash value, or other opaque identifier.
     * Anthropic may use this id to help detect abuse. Do not include any identifying
     * information such as name, email address, or phone number.
     */
    @Expose({ name: 'user_id' })
    userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }
}

/**
 * Chat completion request object.
 */
export class ChatRequest {

    /**
     * The model that will complete your prompt. See the list of
     * <a href="https://docs.anthropic.com/claude/docs/models-overview">models</a> for
     * additional details and options.
     */
    model: string;

    /**
     * Input messages.
     */
    @Type(() => AnthropicMessage)
    messages: AnthropicMessage[];

    /**
     * System prompt. A system prompt is a way of providing context and
     * instructions to Claude, such as specifying a particular goal or role. See our
     * <a href="https://docs.anthropic.com/claude/docs/system-prompts">guide</a> to system
     * prompts.
     */
    system?: string;

    /**
     * The maximum number of tokens to generate before stopping. Note
     * that our models may stop before reaching this maximum. This parameter only
     * specifies the absolute maximum number of tokens to generate. Different models have
     * different maximum values for this parameter.
     */
    @Expose({ name: 'max_tokens' })
    maxTokens: number;

    /**
     * An object describing metadata about the request.
     */
    metadata?: Metadata;

    /**
     * Custom text sequences that will cause the model to stop
     * generating. Our models will normally stop when they have naturally completed their
     * turn, which will result in a response stop_reason of "end_turn". If you want the
     * model to stop generating when it encounters custom strings of text, you can use the
     * stop_sequences parameter. If the model encounters one of the custom sequences, the
     * response stop_reason value will be "stop_sequence" and the response stop_sequence
     * value will contain the matched stop sequence.
     */
    @Expose({ name: 'stop_sequences' })
    stopSequences?: string[];

    /**
     * Whether to incrementally stream the response using server-sent
     * events.
     */
    stream: boolean;

    /**
     * Amount of randomness injected into the response.Defaults to 1.0.
     * Ranges from 0.0 to 1.0. Use temperature closer to 0.0 for analytical / multiple
     * choice, and closer to 1.0 for creative and generative tasks. Note that even with
     * temperature of 0.0, the results will not be fully deterministic.
     */
    temperature?: number;

    /**
     * Use nucleus sampling. In nucleus sampling, we compute the cumulative
     * distribution over all the options for each subsequent token in decreasing
     * probability order and cut it off once it reaches a particular probability specified
     * by top_p. You should either alter temperature or top_p, but not both. Recommended
     * for advanced use cases only. You usually only need to use temperature.
     */
    @Expose({ name: 'top_p' })
    topP?: number;

    /**
     * Only sample from the top K options for each subsequent token. Used to
     * remove "long tail" low probability responses. Learn more technical details here.
     * Recommended for advanced use cases only. You usually only need to use temperature.
     */
    @Expose({ name: 'top_k' })
    topK?: number;

    /**
     * Definitions of tools that the model may use. If provided the model may
     * return tool_use content blocks that represent the model's use of those tools. You
     * can then run those tools using the tool input generated by the model and then
     * optionally return results back to the model using tool_result content blocks.
     */
    @Type(() => Tool)
    tools?: Tool[];

    constructor(
        model: string,
        messages: AnthropicMessage[],
        system: string | undefined,
        maxTokens: number,
        temperature: number | undefined,
        stream: boolean,
        metadata?: Metadata,
        stopSequences?: string[],
        topP?: number,
        topK?: number,
        tools?: Tool[],
    ) {
        this.model = model;
        this.messages = messages;
        this.system = system;
        this.maxTokens = maxTokens;
        this.metadata = metadata;
        this.stopSequences = stopSequences;
        this.stream = stream;
        this.temperature = temperature;
        this.topP = topP;
        this.topK = topK;
        this.tools = tools;
    }

    /**
     * Builder class for ChatRequest
     */
    static builder(): ChatRequestBuilder {
        return new ChatRequestBuilder();
    }

    static from(request: ChatRequest): ChatRequestBuilder {
        return new ChatRequestBuilder(request);
    }
}

/**
 * Builder interface for ChatRequest
 */
export class ChatRequestBuilder {
    private model: string;
    private messages: AnthropicMessage[];
    private system?: string;
    private maxTokens: number;
    private metadata?: Metadata;
    private stopSequences?: string[];
    private stream: boolean = false;
    private temperature?: number;
    private topP?: number;
    private topK?: number;
    private tools?: Tool[];

    constructor(request?: ChatRequest) {
        if (request) {
            this.model = request.model;
            this.messages = request.messages;
            this.system = request.system;
            this.maxTokens = request.maxTokens;
            this.metadata = request.metadata;
            this.stopSequences = request.stopSequences;
            this.stream = request.stream;
            this.temperature = request.temperature;
            this.topP = request.topP;
            this.topK = request.topK;
        }
    }

    withMessages(messages: AnthropicMessage[]): ChatRequestBuilder {
        this.messages = messages;
        return this;
    }

    withStream(stream: boolean): ChatRequestBuilder {
        this.stream = stream;
        return this;
    }

    withModel(model: string): ChatRequestBuilder {
        this.model = model;
        return this;
    }

    withSystem(system: string): ChatRequestBuilder {
        this.system = system;
        return this;
    }

    withStopSequences(stopSequences: string[]): ChatRequestBuilder {
        this.stopSequences = stopSequences;
        return this;
    }

    withMaxTokens(maxTokens: number): ChatRequestBuilder {
        this.maxTokens = maxTokens;
        return this;
    }

    withTemperature(temperature: number): ChatRequestBuilder {
        this.temperature = temperature;
        return this;
    }

    withTopP(topP: number): ChatRequestBuilder {
        this.topP = topP;
        return this;
    }

    withTopK(topK: number): ChatRequestBuilder {
        this.topK = topK;
        return this;
    }

    withMetadata(metadata: Metadata): ChatRequestBuilder {
        this.metadata = metadata;
        return this;
    }

    withTools(tools: Tool[]): ChatRequestBuilder {
        this.tools = tools;
        return this;
    }

    build(): ChatRequest {
        return new ChatRequest(
            this.model,
            this.messages,
            this.system,
            this.maxTokens,
            this.temperature,
            this.stream,
            this.metadata,
            this.stopSequences,
            this.topP,
            this.topK,
            this.tools
        );
    }
}
