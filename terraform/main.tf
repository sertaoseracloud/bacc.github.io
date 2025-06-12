resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_storage_account" "blob" {
  for_each = { for s in var.storages : s.name => s }

  name                     = each.value.name
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  allow_blob_public_access = false

  static_website {
    index_document     = "index.html"
    error_404_document = "404.html"
  }
}

output "web_endpoints" {
  value = { for name, sa in azurerm_storage_account.blob : name => sa.primary_web_endpoint }
}
