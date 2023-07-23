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
      prompt_types: {
        Row: {
          id: number
          signifier: string | null
          type: string | null
        }
        Insert: {
          id?: number
          signifier?: string | null
          type?: string | null
        }
        Update: {
          id?: number
          signifier?: string | null
          type?: string | null
        }
        Relationships: []
      }
      prompts: {
        Row: {
          created_at: string | null
          db_queries: Json | null
          generation_directives: Json | null
          id: number
          memetic_proxies: Json | null
          name: string | null
          output_format: Json | null
          signifier: string | null
          type: number | null
        }
        Insert: {
          created_at?: string | null
          db_queries?: Json | null
          generation_directives?: Json | null
          id?: number
          memetic_proxies?: Json | null
          name?: string | null
          output_format?: Json | null
          signifier?: string | null
          type?: number | null
        }
        Update: {
          created_at?: string | null
          db_queries?: Json | null
          generation_directives?: Json | null
          id?: number
          memetic_proxies?: Json | null
          name?: string | null
          output_format?: Json | null
          signifier?: string | null
          type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prompts_type_fkey"
            columns: ["type"]
            referencedRelation: "prompt_types"
            referencedColumns: ["id"]
          }
        ]
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

