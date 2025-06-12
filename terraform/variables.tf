variable "resource_group_name" {
  type        = string
  description = "Resource group for storage accounts"
}

variable "location" {
  type        = string
  description = "Azure region"
  default     = "eastus"
}

variable "storages" {
  type = list(object({
    name = string
  }))
  description = "List of storage accounts"
}
