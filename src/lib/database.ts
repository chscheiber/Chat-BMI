export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      personas: {
        Row: {
          id: number
          name: string | null
          value: string
        }
        Insert: {
          id?: number
          name?: string | null
          value: string
        }
        Update: {
          id?: number
          name?: string | null
          value?: string
        }
        Relationships: []
      }
      prompt_types: {
        Row: {
          description: string
          key: string
          system_prompt: string
        }
        Insert: {
          description: string
          key: string
          system_prompt: string
        }
        Update: {
          description?: string
          key?: string
          system_prompt?: string
        }
        Relationships: []
      }
      prompts: {
        Row: {
          created_at: string | null
          description: string | null
          elements: Json
          fts: unknown | null
          id: number
          llm_model_name: string | null
          name: string
          output_format: string | null
          persona_id: number | null
          private: boolean
          scenario_id: number | null
          signifier: string
          team_id: number | null
          type: string
          user_id: number | null
          visibility: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          elements?: Json
          fts?: unknown | null
          id?: number
          llm_model_name?: string | null
          name: string
          output_format?: string | null
          persona_id?: number | null
          private?: boolean
          scenario_id?: number | null
          signifier: string
          team_id?: number | null
          type: string
          user_id?: number | null
          visibility?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          elements?: Json
          fts?: unknown | null
          id?: number
          llm_model_name?: string | null
          name?: string
          output_format?: string | null
          persona_id?: number | null
          private?: boolean
          scenario_id?: number | null
          signifier?: string
          team_id?: number | null
          type?: string
          user_id?: number | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompts_persona_id_fkey"
            columns: ["persona_id"]
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prompts_scenario_id_fkey"
            columns: ["scenario_id"]
            referencedRelation: "scenarios"
            referencedColumns: ["id"]
          }
        ]
      }
      scenarios: {
        Row: {
          id: number
          name: string | null
          value: string
        }
        Insert: {
          id?: number
          name?: string | null
          value: string
        }
        Update: {
          id?: number
          name?: string | null
          value?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          id: number
          name: string
          openai_key: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          openai_key?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          openai_key?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

