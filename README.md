# Peak Link
Pratique o seu hobbie favorito e de quebra ainda ajude a mapear a topologia do ambiente


# Como rodar o projeto

a estrutura do projeto eh um monorepo ou seja todo o codigo tanto backend quanto frontend esta no mesmo repositorio
essa estrategia eh muito eficiente em projetos pequenos pois centraliza todo o trabalho em um repositorio e evita a criacao de novos repositorios que no fim das contas serviriam para o mesmo propositos

das tecnologias usadas:

#### frontend: 
 - vite
 - tanstack-router
 - leafy-maps
 - shadcnui
 - tailwindcss

#### backend: 
 - express
 - mongoose


#### mobile (Futuro):
 - expo 


## Passo 1
clone esse repositorio no seu computador com o comando `git clone`

## Passo 2
instale as dependencies de cada modulo execute
```bash
cd apps/server
npm install

-- de volta a pasta raiz
cd apps/client
npm install
```

## Passo 3
crie um container docker para o mongodb, caso ja tenha o mongodb rodando localmente ignore esse passo

## Passo 4
na pasta do servidor `cd apps/server` crie um arquivo .env
pode user esse env de exemplo
```env

MONGODB_URI=mongodb://admin:hiking123@localhost:27017/hiking-app?authSource=admin
PORT=3333

```


## Passo 5
de volta na pasta raiz, faca o comando npm run dev, e veja o servidor e o cliente web rodarem juntos no mesmo repo, caso aja algum erro por favor faca um novo issue que sera corrigido ASAP