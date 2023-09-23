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
      collections: {
        Row: {
          created_at: string
          description: string | null
          id: number
          team_id: string
          title: string
          user_id: string
          visibility: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          team_id: string
          title: string
          user_id: string
          visibility: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          team_id?: string
          title?: string
          user_id?: string
          visibility?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          collection: number | null
          created_at: string
          id: number
          last_modified: string
          messages: Json
          team_id: string
          title: string
          user_id: string
        }
        Insert: {
          collection?: number | null
          created_at?: string
          id?: number
          last_modified?: string
          messages?: Json
          team_id: string
          title: string
          user_id: string
        }
        Update: {
          collection?: number | null
          created_at?: string
          id?: number
          last_modified?: string
          messages?: Json
          team_id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_collection_fkey"
            columns: ["collection"]
            referencedRelation: "collections"
            referencedColumns: ["id"]
          }
        ]
      }
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
      prompt_collection_mapping: {
        Row: {
          collection: number
          position: number
          prompt: number
        }
        Insert: {
          collection: number
          position?: number
          prompt: number
        }
        Update: {
          collection?: number
          position?: number
          prompt?: number
        }
        Relationships: [
          {
            foreignKeyName: "prompt_collection_mapping_collection_fkey"
            columns: ["collection"]
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prompt_collection_mapping_prompt_fkey"
            columns: ["prompt"]
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          }
        ]
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
          team_id: string | null
          type: string
          user_id: string | null
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
          team_id?: string | null
          type: string
          user_id?: string | null
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
          team_id?: string | null
          type?: string
          user_id?: string | null
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
      templates: {
        Row: {
          created_at: string
          description: string
          id: number
          image_url: string | null
          items: Json | null
          source: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          image_url?: string | null
          items?: Json | null
          source?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          image_url?: string | null
          items?: Json | null
          source?: string | null
          title?: string
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

