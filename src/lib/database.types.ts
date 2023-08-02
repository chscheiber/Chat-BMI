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
      prompt_element_categories: {
        Row: {
          id: number
          key: string
          name: string
        }
        Insert: {
          id?: number
          key: string
          name: string
        }
        Update: {
          id?: number
          key?: string
          name?: string
        }
        Relationships: []
      }
      prompt_element_input_types: {
        Row: {
          key: string
          name: string
        }
        Insert: {
          key: string
          name: string
        }
        Update: {
          key?: string
          name?: string
        }
        Relationships: []
      }
      prompt_elements: {
        Row: {
          category: number
          description: string | null
          id: number
          input_type: string | null
          key: string
          multiple: boolean
          name: string
          signifier: string | null
        }
        Insert: {
          category: number
          description?: string | null
          id?: number
          input_type?: string | null
          key: string
          multiple?: boolean
          name: string
          signifier?: string | null
        }
        Update: {
          category?: number
          description?: string | null
          id?: number
          input_type?: string | null
          key?: string
          multiple?: boolean
          name?: string
          signifier?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_elements_category_fkey"
            columns: ["category"]
            referencedRelation: "prompt_element_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prompt_elements_input_type_fkey"
            columns: ["input_type"]
            referencedRelation: "prompt_element_input_types"
            referencedColumns: ["key"]
          }
        ]
      }
      prompt_types: {
        Row: {
          description: string
          id: number
          name: string
          order: number
          signifier: string
          type: string
        }
        Insert: {
          description: string
          id?: number
          name: string
          order: number
          signifier: string
          type: string
        }
        Update: {
          description?: string
          id?: number
          name?: string
          order?: number
          signifier?: string
          type?: string
        }
        Relationships: []
      }
      prompt_types_elements: {
        Row: {
          prompt_element: number
          prompt_type: number
          required: boolean
        }
        Insert: {
          prompt_element: number
          prompt_type: number
          required?: boolean
        }
        Update: {
          prompt_element?: number
          prompt_type?: number
          required?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "prompt_types_elements_prompt_element_fkey"
            columns: ["prompt_element"]
            referencedRelation: "prompt_elements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prompt_types_elements_prompt_type_fkey"
            columns: ["prompt_type"]
            referencedRelation: "prompt_types"
            referencedColumns: ["id"]
          }
        ]
      }
      prompts: {
        Row: {
          created_at: string | null
          description: string | null
          elements: Json
          id: number
          llm_model_name: string | null
          name: string
          output_format: string | null
          persona_id: number | null
          private: boolean
          scenario_id: number | null
          signifier: string
          type: string
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          elements?: Json
          id?: number
          llm_model_name?: string | null
          name: string
          output_format?: string | null
          persona_id?: number | null
          private?: boolean
          scenario_id?: number | null
          signifier: string
          type: string
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          elements?: Json
          id?: number
          llm_model_name?: string | null
          name?: string
          output_format?: string | null
          persona_id?: number | null
          private?: boolean
          scenario_id?: number | null
          signifier?: string
          type?: string
          user_id?: number | null
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
      user_prompt_elements: {
        Row: {
          element: number
          prompt: number
          value: string | null
        }
        Insert: {
          element: number
          prompt: number
          value?: string | null
        }
        Update: {
          element?: number
          prompt?: number
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_prompt_elements_element_fkey"
            columns: ["element"]
            referencedRelation: "prompt_elements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_prompt_elements_prompt_fkey"
            columns: ["prompt"]
            referencedRelation: "user_prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_prompt_elements_prompt_fkey"
            columns: ["prompt"]
            referencedRelation: "user_prompt_elements_view"
            referencedColumns: ["prompt_id"]
          }
        ]
      }
      user_prompts: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          rating: number
          type: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          rating?: number
          type: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          rating?: number
          type?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_prompts_type_fkey"
            columns: ["type"]
            referencedRelation: "prompt_types"
            referencedColumns: ["id"]
          }
        ]
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
      prompt_elements_view: {
        Row: {
          input_type: string | null
          key: string | null
          name: string | null
          pe_name: string | null
          type: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_elements_input_type_fkey"
            columns: ["input_type"]
            referencedRelation: "prompt_element_input_types"
            referencedColumns: ["key"]
          }
        ]
      }
      user_prompt_elements_view: {
        Row: {
          element_key: string | null
          element_name: string | null
          input_type: string | null
          prompt_id: number | null
          value: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_elements_input_type_fkey"
            columns: ["input_type"]
            referencedRelation: "prompt_element_input_types"
            referencedColumns: ["key"]
          }
        ]
      }
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

