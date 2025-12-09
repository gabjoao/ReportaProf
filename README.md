# ReportaProf

O ReportaProf é um projeto realizado nas disciplinas de Análise e Modelagem de Sistemas, WEB II e Mobile para o 4º período do curso de ADS.
O projeto foi realizado em colaboração com o [Bruno Candido](https://github.com/Bruno-Candido-de-Oliveira), que realizou o [backend do projeto](https://github.com/Bruno-Candido-de-Oliveira/ReportaProf).

### O problema

O contexto de realização do projeto é a vivência dos professores da rede estadual que enfrentam desafios relacionados à indisciplina em sala de aula. O protocolo vigente para acionar o apoio da equipe pedagógica exige o deslocamento físico do professor ou de um aluno.
As quatro formas possíveis de comunicação demonstram ineficiência:
* Professor se ausenta da sala: O professor precisa deixar a sala de aula, deixando os alunos sozinhos e correndo o risco de que a situação de indisciplina se agrave.
* Aluno representante é enviado: O aluno representante pode sofrer interrupções durante o processo, não saber relatar claramente a situação ou ter dificuldades em encontrar a equipe pedagógica.
* Alunos envolvidos são enviados: Os alunos envolvidos na indisciplina podem sair da sala, mas optarem por não procurar a equipe pedagógica, escondendo-se em outras instalações escolares.
* Professor leva o aluno até a equipe pedagógica: Os alunos não envolvidos ficariam sozinhos na sala, podendo haver o risco de ocorrer novas ocorrências de indisciplina.
Em todos os casos, o processo de comunicação é lento, vulnerável a intercorrências no deslocamento e corre o risco da equipe pedagógica não ser encontrada em seu devido local, atrasando as providências necessárias.

### Objetivos

A partir dessa ineficiência, surge a necessidade de desenvolver um sistema Mobile/Web que atenda aos diferentes perfis de uso e que otimize a comunicação entre professores e a equipe pedagógica em situações de indisciplina em sala de aula.
O sistema proposto consiste em um aplicativo que permite ao professor registrar uma ocorrência em tempo real em sala de aula com poucos toques. O professor selecionará a turma, os alunos envolvidos e a situação específica (como desobediência, desrespeito ao professor/colegas, bullying, dano ao patrimônio, agressão ou ameaça).
Ao ser gerada, a ocorrência será imediatamente recebida pelos profissionais da equipe pedagógica em seus dispositivos móveis ou computadores, na forma de notificação. Qualquer profissional disponível poderá aceitar a ocorrência, o que automaticamente o notificará para fazer imediatamente a intervenção necessária no local.
Desta forma, é eliminada a necessidade de deslocamento físico até a sala da equipe pedagógica, permitindo que a comunicação seja feita de forma rápida e segura via aplicativo. Após aceitar a ocorrência, o profissional da equipe pedagógica dará o retorno ao professor via sistema, informando que está a caminho para tomar as providências.

## Escopo

Especificamente nesse repositório está apenas a versão *Mobile* da parte do *professor* do sistema.
O fluxo principal é:
1. Professor loga no sistema;
2. Seleciona Turma, Estudantes, Situação, escreve uma observação (opcional)
3. Envia a ocorrência.

Todos os dados são requisitados da API.
Após selecionar uma turma, o sistema puxa os alunos que estão cadastrados nessa turma.
Toda turma já está vinculada a uma sala, porém é possível que naquele momento a turma esteja em uma dependência diferente, como laboratório ou quadra. Ao selecionar a turma existe uma opção de selecionar uma dependência diferente.

## Tecnologias

Foi utilizado no projeto React Native com Expo para a implementação. A escolha do React Native se dá pela portabilidade mais fácil para uma versão Web com React, que, porém, não entra no escopo desse repositório.

[Breve vídeo da implementação](https://www.youtube.com/shorts/ZdhcuVoxjx0)
