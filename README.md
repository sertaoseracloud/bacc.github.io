# BACC - Brazil Angola Cloud Connection

Este repositório hospeda o código fonte do site estático do evento **BACC**. O projeto foi organizado para que seja simples de manter e evoluir.

## Estrutura do projeto

```
assets/
  css/    - folhas de estilo
  js/     - códigos JavaScript
  images/ - imagens utilizadas no site
pages/
  fall-2025.html - exemplo de página de edição anterior
index.html        - página principal
404.html          - página de erro personalizada
```

Todo o conteúdo está dentro da pasta `assets` para facilitar a separação entre recursos estáticos e documentos HTML.
Todo o CSS e JavaScript residem em `assets` para manter as páginas HTML limpas.
O script `assets/js/main.js` também controla a animação da navegação, aplicando
uma sombra quando a página é rolada para melhorar a visibilidade.

## Licença

Os arquivos deste repositório estão sob licença MIT, salvo indicação em contrário nos próprios arquivos.

## Segurança

Para mitigar riscos de ataques via dependências externas:

- Todos os recursos carregados de CDNs possuem **Subresource Integrity (SRI)** e o atributo `crossorigin="anonymous"`.
- Links que abrem em nova aba utilizam `rel="noopener noreferrer"`.

## Git Flow

Utilizamos um fluxo simples com três ramos principais:

- `dev` &ndash; desenvolvimento contínuo e integração de funcionalidades;
- `hml` &ndash; homologação e testes finais antes de ir para produção;
- `main` &ndash; versão estável publicada.

Para iniciar uma nova funcionalidade:

```bash
git checkout dev
git checkout -b feature/minha-feature
```

Depois de revisado em `dev`, faça *merge* para `hml`. Quando homologado, o conteúdo de `hml` é promovido para `main`. Hotfixes podem partir de `main` e ser aplicados aos demais ramos.

## Deploy com Terraform

A pasta `terraform/` contém a configuração para criar três contas de armazenamento Azure Blob com hospedagem de site estático habilitada. Utilize o `terraform.tfvars` para definir os nomes das contas e o grupo de recursos.

```bash
cd terraform
terraform init
terraform apply
```

Os endereços das páginas serão exibidos ao final da execução.

Para publicar o conteúdo do site em cada blob, utilize o script `scripts/deploy.sh` ou a *GitHub Action* definida em `.github/workflows/deploy.yml`. Defina a variável de ambiente `STORAGE_ACCOUNTS` com os nomes das contas separados por vírgula.
