export type UserRole = 'buyer' | 'seller' | 'admin';
export type AppStatus = 'pending' | 'verified' | 'rejected' | 'published' | 'suspended';
export type VerificationStatus = 'pending' | 'passed' | 'failed' | 'error';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type BanReason = 'policy_violation' | 'fraud' | 'spam' | 'inappropriate_content' | 'security_risk' | 'other';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_banned: boolean;
  ban_reason: BanReason | null;
  banned_at: string | null;
  banned_by: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
  website_url: string | null;
  total_sales: number;
  total_purchases: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string;
  is_active: boolean;
  created_at: string;
}

export interface App {
  id: string;
  seller_id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;
  app_icon_url: string | null;
  app_preview_images: string[];
  source_code_url: string | null;
  app_version: string | null;
  app_size_bytes: number | null;
  platform: string | null;
  price: number;
  currency: string;
  status: AppStatus;
  verification_status: VerificationStatus;
  verification_notes: string | null;
  verified_at: string | null;
  verified_by: string | null;
  download_count: number;
  rating: number;
  review_count: number;
  is_featured: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Keystore {
  id: string;
  app_id: string;
  store_type: string;
  store_file_url: string | null;
  alias: string | null;
  key_password_hash: string | null;
  store_password_hash: string | null;
  certificate_fingerprint: string | null;
  certificate_valid_from: string | null;
  certificate_valid_to: string | null;
  certificate_issuer: string | null;
  certificate_subject: string | null;
  key_algorithm: string | null;
  key_size: number | null;
  signature_algorithm: string | null;
  uploaded_at: string;
  updated_at: string;
}

export interface Signature {
  id: string;
  app_id: string;
  signature_file_url: string | null;
  signature_type: string | null;
  signature_algorithm: string | null;
  signed_at: string | null;
  signer_certificate_url: string | null;
  signature_hash: string | null;
  verification_result: string | null;
  uploaded_at: string;
}

export interface SourceScan {
  id: string;
  app_id: string;
  scan_type: string;
  severity: string | null;
  rule_id: string | null;
  message: string | null;
  file_path: string | null;
  line_number: number | null;
  column_number: number | null;
  code_snippet: string | null;
  is_fixed: boolean;
  scanned_at: string;
}

export interface VerificationSession {
  id: string;
  app_id: string;
  triggered_by: string | null;
  keystore_status: VerificationStatus;
  signature_status: VerificationStatus;
  source_code_status: VerificationStatus;
  virus_scan_status: VerificationStatus;
  overall_status: VerificationStatus;
  details: Record<string, unknown>;
  started_at: string;
  completed_at: string | null;
  error_message: string | null;
}

export interface Payment {
  id: string;
  buyer_id: string;
  app_id: string;
  seller_id: string;
  amount: number;
  currency: string;
  platform_fee: number;
  seller_earning: number;
  status: PaymentStatus;
  payment_provider: string | null;
  payment_provider_id: string | null;
  download_url: string | null;
  download_expires_at: string | null;
  downloaded_at: string | null;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  app_id: string;
  buyer_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  is_verified_purchase: boolean;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: string;
  event_name: string;
  user_id: string | null;
  app_id: string | null;
  properties: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  assigned_to: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppVersion {
  id: string;
  app_id: string;
  version: string;
  source_code_url: string | null;
  keystore_id: string | null;
  signature_id: string | null;
  changelog: string | null;
  is_active: boolean;
  created_at: string;
}

export interface UserPreference {
  id: string;
  user_id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  marketing_emails: boolean;
  theme: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalApps: number;
  pendingApps: number;
  verifiedApps: number;
  rejectedApps: number;
  totalSales: number;
  totalRevenue: number;
  totalBuyers: number;
  totalSellers: number;
  activeBans: number;
}
