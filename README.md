# emCrypt

**[TESTE AQUI](https://giancarl021.github.io/emCrypt)**

## Função
Criptografar códigos em C, usando uma biblioteca para auxílio.

## Funcionamento
O site recebe um código-fonte em C e o converte para um código com uma série de constantes alfanuméricas **(main.cpp)**, separadas por espaços. Essas variáveis são definidas em uma biblioteca em C **(emCrypt.h)**, usando o comando *#define*, todas as importações do código original serão passados para a biblioteca, deixando apenas a importação da própria biblioteca para o código principal.

## Entrada de Dados

### Área de Texto
É possível encriptar um código colando ele na área de texto com o título *Entrada* e clicar no botão *Encriptar*.

### Upload do Arquivo
Também é possível carregar o código-fonte de um arquivo de texto sem formatação (.txt, .cpp, .c) clicando no link *dê upload do arquivo* e selecionando o arquivo do seu computador. O código será colocado na área de texto de entrada, para que, se necessário, faça alterações no código original para encriptá-lo. Caso faça alguma mudança, clique no botão *Encriptar* para aplicá-las.

## Saída de Dados

### Importante
Para o código funcionar, a biblioteca e código encriptado deverão estar no mesmo endereço, caso queira separar a biblioteca do código-fonte, mude a primeira linha do código-fonte de 

    #include "enCrypt.h"

para

    #include "<ENDEREÇO DA BILIOTECA>"

Caso queira renomear a biblioteca, o processo é semelhante, renomeie a biblioteca para o nome desejado, e altere o nome dela na primeira linha do código-fonte de

    #include "enCrypt.h"

para

    #include "novoNome.h"

### Área de Texto
Ao encriptar o código, a caixa de texto com o título *Saída* ficará com o código criptografado em uma aba e a biblioteca em outra. Para o código funcionar, copie a cole o código-fonte e salve em um arquivo **.cpp** ou **.c** e salve. Em seguida, copie e cole o código da biblioteca na aba *enCrypt.h*, e salve o código copiado com este mesmo nome **e extensão**.

### Download do ZIP
Ao encriptar o código, clique no botão *Download ZIP*. Com isso, uma janela de aviso aparecerá. Clique em *Download* e o download começará.

#### IMPORTANTE: Para garantir que os arquivos não corrompam, os códigos perderão os acentos ao serem convertidos em ZIP. Um aviso será exibido antes de cada download.