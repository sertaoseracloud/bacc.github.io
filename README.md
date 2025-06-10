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
```

Todo o conteúdo está dentro da pasta `assets` para facilitar a separação entre recursos estáticos e documentos HTML.
Todo o CSS e JavaScript residem em `assets` para manter as páginas HTML limpas.

## Licença

Os arquivos deste repositório estão sob licença MIT, salvo indicação em contrário nos próprios arquivos.

## Segurança

Para mitigar riscos de ataques via dependências externas:

- Todos os recursos carregados de CDNs possuem **Subresource Integrity (SRI)** e o atributo `crossorigin="anonymous"`.
- Links que abrem em nova aba utilizam `rel="noopener noreferrer"`.
