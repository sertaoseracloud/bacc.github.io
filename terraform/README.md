# Terraform Configuration for BACC Site

This configuration creates three Azure Storage Accounts for hosting the static website.

## Usage

1. Install [Terraform](https://www.terraform.io/downloads.html) and the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).
2. Authenticate with Azure using `az login`.
3. Update `dev.tfvars`, `hml.tfvars` and `main.tfvars` with the resource group and storage account names for each environment.
4. Run `terraform init` and then `terraform apply -var-file=<env>.tfvars`.

Example `dev.tfvars`:

```hcl
resource_group_name = "bacc-rg"
storages = [
  { name = "baccstorage1" },
  { name = "baccstorage2" },
  { name = "baccstorage3" }
]
```

After applying, note the output `web_endpoints` for the URLs of the static sites.
