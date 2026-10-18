# Uso responsável de IA

**Leia o documento em [rbribeiro.github.io/ia](https://rbribeiro.github.io/ia).**

Este repositório guarda o documento *Uso responsável de IA*. Ele quer servir de
referência sobre o que consideramos um uso responsável de inteligência artificial no
contexto acadêmico. O texto parte de como seres humanos aprendem (atrito cognitivo,
tentativa e erro, o tempo gasto nos primeiros problemas, o papel do papel e da caneta)
e propõe um critério simples: um uso de IA é responsável quando preserva o esforço que
gera aprendizado, em vez de eliminá-lo. O documento traz ainda exemplos de interações
em que a IA atua como tutora e recomendações de como declarar o uso de IA num trabalho.

## Origem

O documento foi construído com as alunas e os alunos do IMPA Tech na oficina
**Uso responsável de IA**, ministrada pelo professor Rodrigo Ribeiro no período 2026.2.
As ideias, a estrutura e as conclusões vêm das discussões da oficina.

O próprio documento é um exemplo do que defende: ele foi escrito com a assistência do
Claude, um modelo de IA. Pela marcação de colaboração do Delta, o professor deixou
tarefas para a IA dentro do arquivo-fonte. Cada trecho escrito por ela entrou como
rascunho e só foi aceito depois de revisado. A seção *Declaração de uso de IA* detalha
onde e como a IA foi usada.

## Feito em Delta

O documento foi escrito em [Delta](https://github.com/rbribeiro/delta), uma linguagem
de marcação inspirada no LaTeX, com sintaxe XML estrita. Ela compila para um único
arquivo HTML autocontido: numeração, referências cruzadas e matemática (KaTeX) são
resolvidas na compilação, e a leitura não precisa de internet.

## Estrutura

| Caminho | Conteúdo |
|---|---|
| [uso_de_ia.dlt](uso_de_ia.dlt) | Fonte do documento |
| [ai-interaction/](ai-interaction/) | Pacote Delta com a tag `<ai-interaction>` (turnos `<prompt>` e `<answer>`), usada nos exemplos |
| [docs/index.html](docs/index.html) | Versão publicada no GitHub Pages |

## Compilar

Com o Delta instalado:

```bash
delta build uso_de_ia.dlt -o docs/index.html
```

Para recompilar a cada alteração, acrescente `--watch`. Para ver as tarefas e os
comentários em aberto:

```bash
delta review uso_de_ia.dlt --status open
```
