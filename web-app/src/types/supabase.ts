export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_notifications: {
        Row: {
          created_at: string
          description: string | null
          id: number
          is_read: boolean
          metadata: Json | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          is_read?: boolean
          metadata?: Json | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          is_read?: boolean
          metadata?: Json | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      ai_usage_logs: {
        Row: {
          calls_made: number
          created_at: string | null
          id: string
          month_year: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          calls_made?: number
          created_at?: string | null
          id?: string
          month_year: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          calls_made?: number
          created_at?: string | null
          id?: string
          month_year?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          last_used_at: string | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          last_used_at?: string | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          last_used_at?: string | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor: string
          created_at: string
          id: number
          ip: string | null
          metadata: Json | null
          resource: string | null
          status: string
          type: string
        }
        Insert: {
          action: string
          actor: string
          created_at?: string
          id?: number
          ip?: string | null
          metadata?: Json | null
          resource?: string | null
          status?: string
          type?: string
        }
        Update: {
          action?: string
          actor?: string
          created_at?: string
          id?: number
          ip?: string | null
          metadata?: Json | null
          resource?: string | null
          status?: string
          type?: string
        }
        Relationships: []
      }
      billing_cycles: {
        Row: {
          created_at: string
          end_date: string
          id: string
          plan_id: string
          start_date: string
          status: string
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          plan_id: string
          start_date?: string
          status?: string
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          plan_id?: string
          start_date?: string
          status?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_cycles_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_cycles_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_history: {
        Row: {
          amount: number
          billing_period: string | null
          created_at: string | null
          currency: string
          id: string
          plan: string
          status: string | null
          transaction_id: string | null
          transaction_ref: string | null
          user_id: string | null
          verified_at: string | null
        }
        Insert: {
          amount: number
          billing_period?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          plan: string
          status?: string | null
          transaction_id?: string | null
          transaction_ref?: string | null
          user_id?: string | null
          verified_at?: string | null
        }
        Update: {
          amount?: number
          billing_period?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          plan?: string
          status?: string | null
          transaction_id?: string | null
          transaction_ref?: string | null
          user_id?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      business_cards: {
        Row: {
          created_at: string | null
          custom_address: string | null
          custom_email: string | null
          custom_name: string | null
          custom_phone: string | null
          custom_title: string | null
          custom_website: string | null
          format: string | null
          id: string
          qr_data: string | null
          team_id: string | null
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custom_address?: string | null
          custom_email?: string | null
          custom_name?: string | null
          custom_phone?: string | null
          custom_title?: string | null
          custom_website?: string | null
          format?: string | null
          id?: string
          qr_data?: string | null
          team_id?: string | null
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custom_address?: string | null
          custom_email?: string | null
          custom_name?: string | null
          custom_phone?: string | null
          custom_title?: string | null
          custom_website?: string | null
          format?: string | null
          id?: string
          qr_data?: string | null
          team_id?: string | null
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_cards_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: true
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          sender_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          sender_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      client_communication_logs: {
        Row: {
          author_id: string | null
          client_id: number | null
          id: number
          logged_at: string | null
          summary: string | null
          team_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          client_id?: number | null
          id?: number
          logged_at?: string | null
          summary?: string | null
          team_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          client_id?: number | null
          id?: number
          logged_at?: string | null
          summary?: string | null
          team_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_communication_logs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_communication_logs_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      client_documents: {
        Row: {
          client_id: number
          created_at: string | null
          file_size: number | null
          file_type: string | null
          file_url: string
          id: number
          name: string
          uploader_id: string | null
        }
        Insert: {
          client_id: number
          created_at?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: number
          name: string
          uploader_id?: string | null
        }
        Update: {
          client_id?: number
          created_at?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: number
          name?: string
          uploader_id?: string | null
        }
        Relationships: []
      }
      client_ledger: {
        Row: {
          amount: number
          balance_after: number
          balance_before: number
          client_id: number | null
          created_at: string | null
          id: number
          invoice_id: number | null
          metadata: Json | null
          team_id: string | null
          transaction_type: string
        }
        Insert: {
          amount: number
          balance_after: number
          balance_before: number
          client_id?: number | null
          created_at?: string | null
          id?: never
          invoice_id?: number | null
          metadata?: Json | null
          team_id?: string | null
          transaction_type: string
        }
        Update: {
          amount?: number
          balance_after?: number
          balance_before?: number
          client_id?: number | null
          created_at?: string | null
          id?: never
          invoice_id?: number | null
          metadata?: Json | null
          team_id?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_ledger_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_ledger_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_ledger_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      client_notes: {
        Row: {
          author_id: string | null
          client_id: number
          content: string
          created_at: string | null
          id: number
          sentiment: string | null
          sentiment_confidence: number | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          client_id: number
          content: string
          created_at?: string | null
          id?: number
          sentiment?: string | null
          sentiment_confidence?: number | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          client_id?: number
          content?: string
          created_at?: string | null
          id?: number
          sentiment?: string | null
          sentiment_confidence?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          business_name: string | null
          company_name: string | null
          country: string | null
          country_code: string | null
          created_at: string | null
          current_balance: number | null
          email: string | null
          id: number
          lead_status: string | null
          name: string
          notes: string | null
          payment_method_brand: string | null
          payment_method_last4: string | null
          payment_token: string | null
          payment_token_updated_at: string | null
          phone: string | null
          portal_token: string | null
          position: string | null
          tags: string[] | null
          team_id: string | null
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          business_name?: string | null
          company_name?: string | null
          country?: string | null
          country_code?: string | null
          created_at?: string | null
          current_balance?: number | null
          email?: string | null
          id?: number
          lead_status?: string | null
          name: string
          notes?: string | null
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          payment_token?: string | null
          payment_token_updated_at?: string | null
          phone?: string | null
          portal_token?: string | null
          position?: string | null
          tags?: string[] | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string | null
          company_name?: string | null
          country?: string | null
          country_code?: string | null
          created_at?: string | null
          current_balance?: number | null
          email?: string | null
          id?: number
          lead_status?: string | null
          name?: string
          notes?: string | null
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          payment_token?: string | null
          payment_token_updated_at?: string | null
          phone?: string | null
          portal_token?: string | null
          position?: string | null
          tags?: string[] | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_signatures: {
        Row: {
          audit_hash: string
          contract_id: string
          id: number
          ip_address: string | null
          signature_data_url: string
          signed_at: string
          signer_email: string
          signer_name: string
          user_agent: string | null
        }
        Insert: {
          audit_hash: string
          contract_id: string
          id?: number
          ip_address?: string | null
          signature_data_url: string
          signed_at?: string
          signer_email: string
          signer_name: string
          user_agent?: string | null
        }
        Update: {
          audit_hash?: string
          contract_id?: string
          id?: number
          ip_address?: string | null
          signature_data_url?: string
          signed_at?: string
          signer_email?: string
          signer_name?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_signatures_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          client_id: number | null
          created_at: string | null
          id: string
          signature_data: string | null
          signed_at: string | null
          signed_by: string | null
          signed_ip: string | null
          status: string
          terms_html: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          client_id?: number | null
          created_at?: string | null
          id?: string
          signature_data?: string | null
          signed_at?: string | null
          signed_by?: string | null
          signed_ip?: string | null
          status?: string
          terms_html?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          client_id?: number | null
          created_at?: string | null
          id?: string
          signature_data?: string | null
          signed_at?: string | null
          signed_by?: string | null
          signed_ip?: string | null
          status?: string
          terms_html?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_domains: {
        Row: {
          created_at: string | null
          domain_name: string
          id: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          domain_name: string
          id?: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          domain_name?: string
          id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_domains_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_domains_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      data_exports: {
        Row: {
          created_at: string
          export_name: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          export_name: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          export_name?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      expense_categories: {
        Row: {
          color: string | null
          created_at: string | null
          icon: string | null
          id: number
          name: string
          user_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: number
          name: string
          user_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: number
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string | null
          category_id: number | null
          created_at: string | null
          currency_code: string | null
          expense_date: string
          id: number
          invoice_id: number | null
          is_recurring: boolean | null
          notes: string | null
          receipt_url: string | null
          status: string
          team_id: string | null
          updated_at: string | null
          user_id: string | null
          vendor_id: number | null
        }
        Insert: {
          amount?: number
          category?: string | null
          category_id?: number | null
          created_at?: string | null
          currency_code?: string | null
          expense_date?: string
          id?: number
          invoice_id?: number | null
          is_recurring?: boolean | null
          notes?: string | null
          receipt_url?: string | null
          status?: string
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          vendor_id?: number | null
        }
        Update: {
          amount?: number
          category?: string | null
          category_id?: number | null
          created_at?: string | null
          currency_code?: string | null
          expense_date?: string
          id?: number
          invoice_id?: number | null
          is_recurring?: boolean | null
          notes?: string | null
          receipt_url?: string | null
          status?: string
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          vendor_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      fcm_tokens: {
        Row: {
          id: number
          platform: string
          team_id: string
          token: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: never
          platform?: string
          team_id: string
          token: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: never
          platform?: string
          team_id?: string
          token?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fcm_tokens_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      features: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_metered: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id: string
          is_metered?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_metered?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      folders: {
        Row: {
          created_at: string | null
          icon_name: string | null
          id: string
          name: string
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          icon_name?: string | null
          id?: string
          name: string
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          icon_name?: string | null
          id?: string
          name?: string
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "folders_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      help_center_ratings: {
        Row: {
          article_slug: string
          category_slug: string
          created_at: string
          helpful: boolean
          id: string
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          article_slug: string
          category_slug: string
          created_at?: string
          helpful: boolean
          id?: string
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          article_slug?: string
          category_slug?: string
          created_at?: string
          helpful?: boolean
          id?: string
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      identities: {
        Row: {
          card_image_url: string | null
          created_at: string | null
          design_schema: Json | null
          email: string | null
          full_name: string
          id: string
          is_primary: boolean | null
          job_title: string | null
          phone: string | null
          team_id: string | null
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          card_image_url?: string | null
          created_at?: string | null
          design_schema?: Json | null
          email?: string | null
          full_name: string
          id?: string
          is_primary?: boolean | null
          job_title?: string | null
          phone?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          card_image_url?: string | null
          created_at?: string | null
          design_schema?: Json | null
          email?: string | null
          full_name?: string
          id?: string
          is_primary?: boolean | null
          job_title?: string | null
          phone?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "identities_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      identity_leads: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          identity_id: string
          is_converted: boolean | null
          job_title: string | null
          message: string | null
          name: string
          phone: string | null
          source: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          identity_id: string
          is_converted?: boolean | null
          job_title?: string | null
          message?: string | null
          name: string
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          identity_id?: string
          is_converted?: boolean | null
          job_title?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "identity_leads_identity_id_fkey"
            columns: ["identity_id"]
            isOneToOne: false
            referencedRelation: "identities"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_events: {
        Row: {
          action_by_uid: string | null
          created_at: string
          error: string | null
          event_type: string
          id: number
          invoice_id: number
          payload: Json
          processed_at: string | null
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          action_by_uid?: string | null
          created_at?: string
          error?: string | null
          event_type: string
          id?: number
          invoice_id: number
          payload?: Json
          processed_at?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          action_by_uid?: string | null
          created_at?: string
          error?: string | null
          event_type?: string
          id?: number
          invoice_id?: number
          payload?: Json
          processed_at?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_events_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          created_at: string | null
          description: string
          id: number
          invoice_id: number | null
          product_id: number | null
          quantity: number | null
          total: number | null
          unit_price: number | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: number
          invoice_id?: number | null
          product_id?: number | null
          quantity?: number | null
          total?: number | null
          unit_price?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: number
          invoice_id?: number | null
          product_id?: number | null
          quantity?: number | null
          total?: number | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_versions: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          invoice_id: number
          snapshot: Json
          team_id: string
          version_number: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          invoice_id: number
          snapshot: Json
          team_id: string
          version_number: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          invoice_id?: number
          snapshot?: Json
          team_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_versions_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_versions_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          client_id: number | null
          created_at: string | null
          currency_code: string | null
          discount_amount: number | null
          discount_type: string | null
          discount_value: number | null
          due_date: string
          gateway_transaction_id: string | null
          id: number
          invoice_number: string
          invoice_type: string | null
          issue_date: string
          metadata: Json | null
          notes: string | null
          opened_at: string | null
          payment_gateway: string | null
          status: string | null
          subtotal: number | null
          tax_amount: number | null
          tax_rate: number | null
          tax_type: string | null
          team_id: string | null
          total_amount: number | null
          tracking_token: string | null
          updated_at: string | null
          user_id: string | null
          view_count: number | null
        }
        Insert: {
          client_id?: number | null
          created_at?: string | null
          currency_code?: string | null
          discount_amount?: number | null
          discount_type?: string | null
          discount_value?: number | null
          due_date: string
          gateway_transaction_id?: string | null
          id?: number
          invoice_number: string
          invoice_type?: string | null
          issue_date: string
          metadata?: Json | null
          notes?: string | null
          opened_at?: string | null
          payment_gateway?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          tax_rate?: number | null
          tax_type?: string | null
          team_id?: string | null
          total_amount?: number | null
          tracking_token?: string | null
          updated_at?: string | null
          user_id?: string | null
          view_count?: number | null
        }
        Update: {
          client_id?: number | null
          created_at?: string | null
          currency_code?: string | null
          discount_amount?: number | null
          discount_type?: string | null
          discount_value?: number | null
          due_date?: string
          gateway_transaction_id?: string | null
          id?: number
          invoice_number?: string
          invoice_type?: string | null
          issue_date?: string
          metadata?: Json | null
          notes?: string | null
          opened_at?: string | null
          payment_gateway?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          tax_rate?: number | null
          tax_type?: string | null
          team_id?: string | null
          total_amount?: number | null
          tracking_token?: string | null
          updated_at?: string | null
          user_id?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      live_chat_messages: {
        Row: {
          created_at: string | null
          id: number
          is_support: boolean | null
          message: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_support?: boolean | null
          message: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_support?: boolean | null
          message?: string
          user_id?: string | null
        }
        Relationships: []
      }
      nfc_cards: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          profile_url: string
          serial_number: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          profile_url: string
          serial_number: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          profile_url?: string
          serial_number?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfc_cards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfc_cards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nfc_tags: {
        Row: {
          created_at: string | null
          id: string
          status: string | null
          target_url: string
          team_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          status?: string | null
          target_url: string
          team_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: string | null
          target_url?: string
          team_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfc_tags_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      payg_entitlements: {
        Row: {
          business_card_credits: number
          client_slots: number
          dpp_credits: number
          invoice_credits: number
          qr_code_credits: number
          unlocked_business_cards: string[]
          unlocked_invoices: string[]
          unlocked_qr_codes: string[]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          business_card_credits?: number
          client_slots?: number
          dpp_credits?: number
          invoice_credits?: number
          qr_code_credits?: number
          unlocked_business_cards?: string[]
          unlocked_invoices?: string[]
          unlocked_qr_codes?: string[]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          business_card_credits?: number
          client_slots?: number
          dpp_credits?: number
          invoice_credits?: number
          qr_code_credits?: number
          unlocked_business_cards?: string[]
          unlocked_invoices?: string[]
          unlocked_qr_codes?: string[]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          created_at: string | null
          details: Json | null
          id: number
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: number
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: number
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payout_methods: {
        Row: {
          created_at: string | null
          id: string
          is_default: boolean
          metadata: Json | null
          provider: Database["public"]["Enums"]["payout_provider"]
          provider_account_id: string | null
          status: Database["public"]["Enums"]["payout_status"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_default?: boolean
          metadata?: Json | null
          provider: Database["public"]["Enums"]["payout_provider"]
          provider_account_id?: string | null
          status?: Database["public"]["Enums"]["payout_status"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_default?: boolean
          metadata?: Json | null
          provider?: Database["public"]["Enums"]["payout_provider"]
          provider_account_id?: string | null
          status?: Database["public"]["Enums"]["payout_status"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payout_methods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payout_methods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_invitations: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          invited_by: string
          role: string
          team_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          invited_by: string
          role?: string
          team_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          role?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pending_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_invitations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_entitlements: {
        Row: {
          created_at: string | null
          feature_id: string
          id: string
          limit_value: number | null
          plan_id: string
        }
        Insert: {
          created_at?: string | null
          feature_id: string
          id?: string
          limit_value?: number | null
          plan_id: string
        }
        Update: {
          created_at?: string | null
          feature_id?: string
          id?: string
          limit_value?: number | null
          plan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plan_entitlements_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "features"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_entitlements_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      processed_webhooks: {
        Row: {
          created_at: string
          event_type: string
          id: string
          provider: string
          transaction_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          provider: string
          transaction_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          provider?: string
          transaction_id?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string | null
          id: number
          name: string
          team_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          team_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      product_passport_scans: {
        Row: {
          id: number
          ip_address: string | null
          location_data: Json | null
          passport_id: string
          scanned_at: string | null
          user_agent: string | null
        }
        Insert: {
          id?: number
          ip_address?: string | null
          location_data?: Json | null
          passport_id: string
          scanned_at?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: number
          ip_address?: string | null
          location_data?: Json | null
          passport_id?: string
          scanned_at?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_passport_scans_passport_id_fkey"
            columns: ["passport_id"]
            isOneToOne: false
            referencedRelation: "product_passports"
            referencedColumns: ["id"]
          },
        ]
      }
      product_passports: {
        Row: {
          batch_number: string | null
          brand_name: string | null
          certifications: Json | null
          country_of_origin: string | null
          created_at: string | null
          expiry_date: string | null
          hs_code: string | null
          id: string
          manufacturer_info: Json | null
          product_id: number
          product_images: Json | null
          production_date: string | null
          public_status: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string | null
          team_id: string
          updated_at: string | null
        }
        Insert: {
          batch_number?: string | null
          brand_name?: string | null
          certifications?: Json | null
          country_of_origin?: string | null
          created_at?: string | null
          expiry_date?: string | null
          hs_code?: string | null
          id?: string
          manufacturer_info?: Json | null
          product_id: number
          product_images?: Json | null
          production_date?: string | null
          public_status?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string | null
          team_id: string
          updated_at?: string | null
        }
        Update: {
          batch_number?: string | null
          brand_name?: string | null
          certifications?: Json | null
          country_of_origin?: string | null
          created_at?: string | null
          expiry_date?: string | null
          hs_code?: string | null
          id?: string
          manufacturer_info?: Json | null
          product_id?: number
          product_images?: Json | null
          production_date?: string | null
          public_status?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string | null
          team_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_passports_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_passports_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: number | null
          cost_price: number | null
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          is_active: boolean
          min_stock_alert: number | null
          name: string
          sku: string | null
          stock_quantity: number | null
          tags: string[] | null
          tax_rate: number | null
          team_id: string | null
          track_inventory: boolean | null
          type: string
          unit: string | null
          unit_price: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category_id?: number | null
          cost_price?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean
          min_stock_alert?: number | null
          name: string
          sku?: string | null
          stock_quantity?: number | null
          tags?: string[] | null
          tax_rate?: number | null
          team_id?: string | null
          track_inventory?: boolean | null
          type?: string
          unit?: string | null
          unit_price?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category_id?: number | null
          cost_price?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean
          min_stock_alert?: number | null
          name?: string
          sku?: string | null
          stock_quantity?: number | null
          tags?: string[] | null
          tax_rate?: number | null
          team_id?: string | null
          track_inventory?: boolean | null
          type?: string
          unit?: string | null
          unit_price?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_name: string | null
          account_number: string | null
          avatar_url: string | null
          bank_name: string | null
          bio: string | null
          brand_color: string | null
          brand_logo_url: string | null
          brand_signature_url: string | null
          brand_voice: string | null
          business_address: string | null
          business_email: string | null
          business_industry: string | null
          business_name: string | null
          business_phone: string | null
          company: string | null
          country: string | null
          created_at: string | null
          currency_set_by: string | null
          default_invoice_template: string | null
          deletion_scheduled_at: string | null
          detected_country: string | null
          display_name: string | null
          email: string | null
          fcm_token: string | null
          first_login_at: string | null
          id: string
          industry: string | null
          invoice_footer: string | null
          is_superadmin: boolean
          is_yearly_plan: boolean | null
          last_login_at: string | null
          locale: string | null
          notification_preferences: Json | null
          onboarding_completed: boolean | null
          onboarding_tour_completed: boolean | null
          pending_deletion: boolean | null
          phone: string | null
          preferred_currency: string | null
          role: string | null
          secondary_color: string | null
          subscription_expires_at: string | null
          subscription_expiry: string | null
          subscription_status: string | null
          subscription_tier: string | null
          tax_number: string | null
          theme_mode: string | null
          timezone: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          account_name?: string | null
          account_number?: string | null
          avatar_url?: string | null
          bank_name?: string | null
          bio?: string | null
          brand_color?: string | null
          brand_logo_url?: string | null
          brand_signature_url?: string | null
          brand_voice?: string | null
          business_address?: string | null
          business_email?: string | null
          business_industry?: string | null
          business_name?: string | null
          business_phone?: string | null
          company?: string | null
          country?: string | null
          created_at?: string | null
          currency_set_by?: string | null
          default_invoice_template?: string | null
          deletion_scheduled_at?: string | null
          detected_country?: string | null
          display_name?: string | null
          email?: string | null
          fcm_token?: string | null
          first_login_at?: string | null
          id: string
          industry?: string | null
          invoice_footer?: string | null
          is_superadmin?: boolean
          is_yearly_plan?: boolean | null
          last_login_at?: string | null
          locale?: string | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          onboarding_tour_completed?: boolean | null
          pending_deletion?: boolean | null
          phone?: string | null
          preferred_currency?: string | null
          role?: string | null
          secondary_color?: string | null
          subscription_expires_at?: string | null
          subscription_expiry?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          tax_number?: string | null
          theme_mode?: string | null
          timezone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          account_name?: string | null
          account_number?: string | null
          avatar_url?: string | null
          bank_name?: string | null
          bio?: string | null
          brand_color?: string | null
          brand_logo_url?: string | null
          brand_signature_url?: string | null
          brand_voice?: string | null
          business_address?: string | null
          business_email?: string | null
          business_industry?: string | null
          business_name?: string | null
          business_phone?: string | null
          company?: string | null
          country?: string | null
          created_at?: string | null
          currency_set_by?: string | null
          default_invoice_template?: string | null
          deletion_scheduled_at?: string | null
          detected_country?: string | null
          display_name?: string | null
          email?: string | null
          fcm_token?: string | null
          first_login_at?: string | null
          id?: string
          industry?: string | null
          invoice_footer?: string | null
          is_superadmin?: boolean
          is_yearly_plan?: boolean | null
          last_login_at?: string | null
          locale?: string | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          onboarding_tour_completed?: boolean | null
          pending_deletion?: boolean | null
          phone?: string | null
          preferred_currency?: string | null
          role?: string | null
          secondary_color?: string | null
          subscription_expires_at?: string | null
          subscription_expiry?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          tax_number?: string | null
          theme_mode?: string | null
          timezone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      qr_codes: {
        Row: {
          asset_path: string | null
          asset_url: string | null
          color_primary: string | null
          content: Json
          created_at: string | null
          folder_id: string | null
          id: string
          name: string
          team_id: string | null
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          asset_path?: string | null
          asset_url?: string | null
          color_primary?: string | null
          content: Json
          created_at?: string | null
          folder_id?: string | null
          id?: string
          name: string
          team_id?: string | null
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          asset_path?: string | null
          asset_url?: string | null
          color_primary?: string | null
          content?: Json
          created_at?: string | null
          folder_id?: string | null
          id?: string
          name?: string
          team_id?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qr_codes_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_codes_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      qr_scans: {
        Row: {
          device_info: Json | null
          id: number
          location: string | null
          qr_code_id: string | null
          scanned_at: string | null
        }
        Insert: {
          device_info?: Json | null
          id?: number
          location?: string | null
          qr_code_id?: string | null
          scanned_at?: string | null
        }
        Update: {
          device_info?: Json | null
          id?: number
          location?: string | null
          qr_code_id?: string | null
          scanned_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qr_scans_qr_code_id_fkey"
            columns: ["qr_code_id"]
            isOneToOne: false
            referencedRelation: "qr_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      rankings_tracker: {
        Row: {
          google_rank: number
          id: string
          keyword_id: string
          serps_snapshot_url: string | null
          tracked_at: string
        }
        Insert: {
          google_rank?: number
          id?: string
          keyword_id: string
          serps_snapshot_url?: string | null
          tracked_at?: string
        }
        Update: {
          google_rank?: number
          id?: string
          keyword_id?: string
          serps_snapshot_url?: string | null
          tracked_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rankings_tracker_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "seo_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limit_requests: {
        Row: {
          identifier: string
          requested_at: string
        }
        Insert: {
          identifier: string
          requested_at?: string
        }
        Update: {
          identifier?: string
          requested_at?: string
        }
        Relationships: []
      }
      recurring_invoices: {
        Row: {
          amount: number | null
          client_id: number | null
          created_at: string | null
          frequency: string
          id: number
          is_active: boolean | null
          last_run_at: string | null
          next_run_at: string | null
          status: string | null
          team_id: string | null
          template_data: Json
        }
        Insert: {
          amount?: number | null
          client_id?: number | null
          created_at?: string | null
          frequency: string
          id?: number
          is_active?: boolean | null
          last_run_at?: string | null
          next_run_at?: string | null
          status?: string | null
          team_id?: string | null
          template_data?: Json
        }
        Update: {
          amount?: number | null
          client_id?: number | null
          created_at?: string | null
          frequency?: string
          id?: number
          is_active?: boolean | null
          last_run_at?: string | null
          next_run_at?: string | null
          status?: string | null
          team_id?: string | null
          template_data?: Json
        }
        Relationships: [
          {
            foreignKeyName: "recurring_invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurring_invoices_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      scan_logs: {
        Row: {
          id: number
          identity_id: string
          ip_address: string | null
          location: string | null
          scanned_at: string | null
          source: string | null
          user_agent: string | null
        }
        Insert: {
          id?: number
          identity_id: string
          ip_address?: string | null
          location?: string | null
          scanned_at?: string | null
          source?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: number
          identity_id?: string
          ip_address?: string | null
          location?: string | null
          scanned_at?: string | null
          source?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scan_logs_identity_id_fkey"
            columns: ["identity_id"]
            isOneToOne: false
            referencedRelation: "identities"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_posts: {
        Row: {
          article_id: string | null
          content_text: string
          created_at: string | null
          error_message: string | null
          id: string
          media_urls: string[] | null
          platform: string
          platform_post_id: string | null
          scheduled_for: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          article_id?: string | null
          content_text: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          media_urls?: string[] | null
          platform: string
          platform_post_id?: string | null
          scheduled_for: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          article_id?: string | null
          content_text?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          media_urls?: string[] | null
          platform?: string
          platform_post_id?: string | null
          scheduled_for?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_posts_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "seo_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_articles: {
        Row: {
          content_markdown: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          human_score: number
          id: string
          keyword_id: string | null
          meta_description: string
          meta_title: string
          pillar_page_id: string | null
          published_at: string | null
          schema_markup: Json | null
          seo_score: number
          slug: string
          status: Database["public"]["Enums"]["seo_article_status"]
          tags: string[] | null
          title: string
          updated_at: string
          views: number | null
          word_count: number
        }
        Insert: {
          content_markdown?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          human_score?: number
          id?: string
          keyword_id?: string | null
          meta_description: string
          meta_title: string
          pillar_page_id?: string | null
          published_at?: string | null
          schema_markup?: Json | null
          seo_score?: number
          slug: string
          status?: Database["public"]["Enums"]["seo_article_status"]
          tags?: string[] | null
          title: string
          updated_at?: string
          views?: number | null
          word_count?: number
        }
        Update: {
          content_markdown?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          human_score?: number
          id?: string
          keyword_id?: string | null
          meta_description?: string
          meta_title?: string
          pillar_page_id?: string | null
          published_at?: string | null
          schema_markup?: Json | null
          seo_score?: number
          slug?: string
          status?: Database["public"]["Enums"]["seo_article_status"]
          tags?: string[] | null
          title?: string
          updated_at?: string
          views?: number | null
          word_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "seo_articles_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "seo_keywords"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_articles_pillar_page_id_fkey"
            columns: ["pillar_page_id"]
            isOneToOne: false
            referencedRelation: "seo_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_keywords: {
        Row: {
          cluster_parent: string | null
          cpc: number
          created_at: string
          id: string
          intent: Database["public"]["Enums"]["seo_keyword_intent"]
          keyword: string
          pd: number
          seo_difficulty: number
          status: Database["public"]["Enums"]["seo_keyword_status"]
          updated_at: string
          volume: number
        }
        Insert: {
          cluster_parent?: string | null
          cpc?: number
          created_at?: string
          id?: string
          intent?: Database["public"]["Enums"]["seo_keyword_intent"]
          keyword: string
          pd?: number
          seo_difficulty?: number
          status?: Database["public"]["Enums"]["seo_keyword_status"]
          updated_at?: string
          volume?: number
        }
        Update: {
          cluster_parent?: string | null
          cpc?: number
          created_at?: string
          id?: string
          intent?: Database["public"]["Enums"]["seo_keyword_intent"]
          keyword?: string
          pd?: number
          seo_difficulty?: number
          status?: Database["public"]["Enums"]["seo_keyword_status"]
          updated_at?: string
          volume?: number
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          auto_publish: boolean
          brand_voice_config: Json
          created_at: string
          cron_expression: string
          default_meta_description: string
          default_meta_title: string
          id: string
          og_defaults: Json
          updated_at: string
        }
        Insert: {
          auto_publish?: boolean
          brand_voice_config?: Json
          created_at?: string
          cron_expression?: string
          default_meta_description?: string
          default_meta_title?: string
          id?: string
          og_defaults?: Json
          updated_at?: string
        }
        Update: {
          auto_publish?: boolean
          brand_voice_config?: Json
          created_at?: string
          cron_expression?: string
          default_meta_description?: string
          default_meta_title?: string
          id?: string
          og_defaults?: Json
          updated_at?: string
        }
        Relationships: []
      }
      social_accounts: {
        Row: {
          access_token: string
          account_id: string
          account_name: string | null
          created_at: string | null
          id: string
          platform: string
          refresh_token: string | null
          token_expires_at: string | null
          updated_at: string | null
        }
        Insert: {
          access_token: string
          account_id: string
          account_name?: string | null
          created_at?: string | null
          id?: string
          platform: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string
          account_id?: string
          account_name?: string | null
          created_at?: string | null
          id?: string
          platform?: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      stock_ledger: {
        Row: {
          change_amount: number
          created_at: string | null
          id: number
          product_id: number | null
          reason: string | null
          reference_id: string | null
          team_id: string | null
        }
        Insert: {
          change_amount: number
          created_at?: string | null
          id?: number
          product_id?: number | null
          reason?: string | null
          reference_id?: string | null
          team_id?: string | null
        }
        Update: {
          change_amount?: number
          created_at?: string | null
          id?: number
          product_id?: number | null
          reason?: string | null
          reference_id?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_ledger_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_ledger_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          price_monthly: number
          price_yearly: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id: string
          name: string
          price_monthly?: number
          price_yearly?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price_monthly?: number
          price_yearly?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      team_entitlements: {
        Row: {
          created_at: string | null
          expires_at: string | null
          feature_id: string
          id: string
          limit_override: number | null
          metadata: Json | null
          team_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          feature_id: string
          id?: string
          limit_override?: number | null
          metadata?: Json | null
          team_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          feature_id?: string
          id?: string
          limit_override?: number | null
          metadata?: Json | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_entitlements_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "features"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_entitlements_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string | null
          id: string
          role: string | null
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_usage: {
        Row: {
          feature_id: string
          id: string
          period_start: string
          team_id: string
          updated_at: string | null
          used_amount: number
        }
        Insert: {
          feature_id: string
          id?: string
          period_start: string
          team_id: string
          updated_at?: string | null
          used_amount?: number
        }
        Update: {
          feature_id?: string
          id?: string
          period_start?: string
          team_id?: string
          updated_at?: string | null
          used_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "team_usage_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "features"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_usage_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          brand_color: string | null
          brand_logo_url: string | null
          brand_signature_url: string | null
          brand_voice: string | null
          business_address: string | null
          business_email: string | null
          business_phone: string | null
          created_at: string | null
          default_invoice_template: string | null
          default_payment_terms: string | null
          default_vat_rate: number | null
          default_wht_rate: number | null
          flutterwave_subaccount_id: string | null
          flw_subaccount_id: string | null
          id: string
          invoice_footer: string | null
          invoice_prefix: string | null
          logo_url: string | null
          name: string
          owner_id: string | null
          primary_color: string | null
          secondary_color: string | null
          show_watermark: boolean | null
          tax_number: string | null
          updated_at: string | null
        }
        Insert: {
          brand_color?: string | null
          brand_logo_url?: string | null
          brand_signature_url?: string | null
          brand_voice?: string | null
          business_address?: string | null
          business_email?: string | null
          business_phone?: string | null
          created_at?: string | null
          default_invoice_template?: string | null
          default_payment_terms?: string | null
          default_vat_rate?: number | null
          default_wht_rate?: number | null
          flutterwave_subaccount_id?: string | null
          flw_subaccount_id?: string | null
          id?: string
          invoice_footer?: string | null
          invoice_prefix?: string | null
          logo_url?: string | null
          name: string
          owner_id?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          show_watermark?: boolean | null
          tax_number?: string | null
          updated_at?: string | null
        }
        Update: {
          brand_color?: string | null
          brand_logo_url?: string | null
          brand_signature_url?: string | null
          brand_voice?: string | null
          business_address?: string | null
          business_email?: string | null
          business_phone?: string | null
          created_at?: string | null
          default_invoice_template?: string | null
          default_payment_terms?: string | null
          default_vat_rate?: number | null
          default_wht_rate?: number | null
          flutterwave_subaccount_id?: string | null
          flw_subaccount_id?: string | null
          id?: string
          invoice_footer?: string | null
          invoice_prefix?: string | null
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          show_watermark?: boolean | null
          tax_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      usage_metrics: {
        Row: {
          clients_created: number | null
          clients_edited: number | null
          clients_edited_this_month: number | null
          id: string
          invoices_created: number | null
          invoices_edited: number | null
          invoices_edited_this_month: number | null
          month_year: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          clients_created?: number | null
          clients_edited?: number | null
          clients_edited_this_month?: number | null
          id?: string
          invoices_created?: number | null
          invoices_edited?: number | null
          invoices_edited_this_month?: number | null
          month_year: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          clients_created?: number | null
          clients_edited?: number | null
          clients_edited_this_month?: number | null
          id?: string
          invoices_created?: number | null
          invoices_edited?: number | null
          invoices_edited_this_month?: number | null
          month_year?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_gamification: {
        Row: {
          created_at: string
          current_streak: number
          id: string
          invoices_sent: number
          last_action_date: string | null
          level: number
          payments_received: number
          receipts_scanned: number
          unlocked_badges: string[]
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          created_at?: string
          current_streak?: number
          id?: string
          invoices_sent?: number
          last_action_date?: string | null
          level?: number
          payments_received?: number
          receipts_scanned?: number
          unlocked_badges?: string[]
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          created_at?: string
          current_streak?: number
          id?: string
          invoices_sent?: number
          last_action_date?: string | null
          level?: number
          payments_received?: number
          receipts_scanned?: number
          unlocked_badges?: string[]
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_info: Json | null
          device_name: string | null
          id: string
          is_current: boolean | null
          last_active: string | null
          location: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          device_name?: string | null
          id?: string
          is_current?: boolean | null
          last_active?: string | null
          location?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          device_name?: string | null
          id?: string
          is_current?: boolean | null
          last_active?: string | null
          location?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      vendors: {
        Row: {
          category: string | null
          created_at: string | null
          email: string | null
          id: number
          name: string
          phone: string | null
          team_id: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name: string
          phone?: string | null
          team_id?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string
          phone?: string | null
          team_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendors_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string
          currency_code: string
          description: string | null
          fee: number
          id: string
          metadata: Json | null
          net_amount: number
          reference: string | null
          status: string
          type: string
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency_code: string
          description?: string | null
          fee?: number
          id?: string
          metadata?: Json | null
          net_amount: number
          reference?: string | null
          status?: string
          type: string
          user_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency_code?: string
          description?: string | null
          fee?: number
          id?: string
          metadata?: Json | null
          net_amount?: number
          reference?: string | null
          status?: string
          type?: string
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          currency_code: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          currency_code?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          currency_code?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      webhook_logs: {
        Row: {
          created_at: string | null
          headers: Json | null
          id: number
          payload: Json | null
        }
        Insert: {
          created_at?: string | null
          headers?: Json | null
          id?: number
          payload?: Json | null
        }
        Update: {
          created_at?: string | null
          headers?: Json | null
          id?: number
          payload?: Json | null
        }
        Relationships: []
      }
      webhooks: {
        Row: {
          created_at: string | null
          endpoint_url: string
          events: string[] | null
          id: string
          is_active: boolean | null
          secret: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          endpoint_url: string
          events?: string[] | null
          id?: string
          is_active?: boolean | null
          secret: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          endpoint_url?: string
          events?: string[] | null
          id?: string
          is_active?: boolean | null
          secret?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhooks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "webhooks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      invoice_tracking_stats: {
        Row: {
          avg_hours_to_open: number | null
          team_id: string | null
          total_ignored_overdue: number | null
          total_opened: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      public_profiles: {
        Row: {
          brand_logo_url: string | null
          display_name: string | null
          id: string | null
        }
        Insert: {
          brand_logo_url?: string | null
          display_name?: string | null
          id?: string | null
        }
        Update: {
          brand_logo_url?: string | null
          display_name?: string | null
          id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_insert_rate_limit: {
        Args: {
          p_identity_id: string
          p_max_per_minute: number
          p_table_name: string
        }
        Returns: boolean
      }
      check_is_member: { Args: { t_id: string }; Returns: boolean }
      check_is_owner: { Args: { t_id: string }; Returns: boolean }
      check_rate_limit: {
        Args: { p_identifier: string; p_limit: number; p_window_secs: number }
        Returns: {
          allowed: boolean
          remaining: number
          reset_at: string
        }[]
      }
      check_team_access: {
        Args: {
          required_roles?: Database["public"]["Enums"]["team_role"][]
          t_id: string
        }
        Returns: boolean
      }
      check_team_membership: {
        Args: { team_id: string; user_id: string }
        Returns: boolean
      }
      cleanup_rate_limit_requests: { Args: never; Returns: undefined }
      compute_level: { Args: { xp: number }; Returns: number }
      confirm_withdrawal: {
        Args: { p_reference: string; p_status: string }
        Returns: Json
      }
      create_invoice_transaction: {
        Args: {
          p_client_id: number
          p_currency_code: string
          p_discount_amount: number
          p_discount_type: string
          p_discount_value: number
          p_due_date: string
          p_invoice_number: string
          p_invoice_type: string
          p_issue_date: string
          p_items: Json
          p_metadata: Json
          p_notes: string
          p_status: string
          p_subtotal: number
          p_tax_amount: number
          p_tax_rate: number
          p_tax_type: string
          p_team_id: string
          p_total_amount: number
          p_user_id: string
        }
        Returns: Json
      }
      credit_wallet: {
        Args: {
          p_currency_code: string
          p_description?: string
          p_gateway_fee: number
          p_gross_amount: number
          p_platform_fee: number
          p_reference: string
          p_user_id: string
        }
        Returns: Json
      }
      debit_wallet: {
        Args: {
          p_amount: number
          p_currency_code: string
          p_description?: string
          p_reference: string
          p_transfer_fee: number
          p_user_id: string
        }
        Returns: Json
      }
      get_advanced_reports_summary: {
        Args: { p_end_date: string; p_start_date: string; p_user_id: string }
        Returns: Json
      }
      get_client_portal_data: { Args: { p_token: string }; Returns: Json }
      get_dashboard_stats: { Args: { p_team_id: string }; Returns: Json }
      get_platform_stats: { Args: never; Returns: Json }
      get_reports_summary: {
        Args: { p_end_date: string; p_start_date: string; p_user_id: string }
        Returns: Json
      }
      get_revenue_trend: {
        Args: { p_days?: number }
        Returns: {
          day: string
          invoice_count: number
          revenue: number
        }[]
      }
      get_user_growth_trend: {
        Args: { p_days?: number }
        Returns: {
          cumulative_total: number
          day: string
          new_signups: number
        }[]
      }
      has_admin_role: { Args: { required_role: string }; Returns: boolean }
      increment_team_usage: {
        Args: {
          p_feature_id: string
          p_period_start: string
          p_team_id: string
        }
        Returns: undefined
      }
      increment_usage: {
        Args: { col_name: string; m_year: string; u_id: string }
        Returns: undefined
      }
      is_profile_owner: {
        Args: { profile_id_to_check: string }
        Returns: boolean
      }
      is_team_member: { Args: { team_id_to_check: string }; Returns: boolean }
      is_team_owner: { Args: { team_id_to_check: string }; Returns: boolean }
      resolve_team_entitlements: { Args: { p_team_id: string }; Returns: Json }
      update_invoice_secure: {
        Args: {
          p_client_id: number
          p_currency_code: string
          p_discount_amount: number
          p_discount_type: string
          p_discount_value: number
          p_due_date: string
          p_invoice_id: number
          p_invoice_number: string
          p_invoice_type: string
          p_issue_date: string
          p_items: Json
          p_metadata: Json
          p_notes: string
          p_status: string
          p_subtotal: number
          p_tax_amount: number
          p_tax_rate: number
          p_tax_type: string
          p_team_id: string
          p_total_amount: number
        }
        Returns: Json
      }
      update_invoice_with_items: {
        Args: { p_invoice_data: Json; p_invoice_id: number; p_items: Json }
        Returns: Json
      }
      upgrade_user_subscription: {
        Args: {
          is_yearly: boolean
          target_tier: string
          target_user_id: string
        }
        Returns: undefined
      }
      verify_password: {
        Args: { p_email: string; p_password: string }
        Returns: boolean
      }
    }
    Enums: {
      payout_provider: "flutterwave" | "stripe" | "paypal"
      payout_status: "active" | "pending" | "restricted"
      seo_article_status: "draft" | "published"
      seo_keyword_intent:
        | "Informational"
        | "Transactional"
        | "Commercial"
        | "Navigational"
        | "Local"
      seo_keyword_status: "pending" | "processing" | "completed" | "failed"
      sub_tier: "solo" | "pro" | "squad"
      team_role: "owner" | "admin" | "staff" | "accountant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      payout_provider: ["flutterwave", "stripe", "paypal"],
      payout_status: ["active", "pending", "restricted"],
      seo_article_status: ["draft", "published"],
      seo_keyword_intent: [
        "Informational",
        "Transactional",
        "Commercial",
        "Navigational",
        "Local",
      ],
      seo_keyword_status: ["pending", "processing", "completed", "failed"],
      sub_tier: ["solo", "pro", "squad"],
      team_role: ["owner", "admin", "staff", "accountant"],
    },
  },
} as const
