---
titulo: "Privacidade e Proteção de Dados (LGPD)"
nomeOficial: "POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS PESSOAIS - SENSORIZ"
descricao: "Como a Sensoriz coleta, usa, guarda e protege dados pessoais, e como exercer seus direitos."
ordem: 3
# Texto copiado sem alteração de sensoriz.com.br/politicas (Framer) em 29/09/2026.
---

Versão 2.0 | Data de Atualização: 19 de junho de 2026

## 1. Introdução e Compromisso Institucional

A Sensoriz (razão social Soluções Tecnológicas LTDA) reafirma o seu compromisso permanente com a proteção de dados pessoais, a privacidade e o tratamento responsável de informações. Todas as nossas atividades operacionais e tecnológicas são conduzidas em total conformidade com a Lei Geral de Proteção de Dados – LGPD (Lei nº 13.709/2018) e demais regulamentações vigentes no ordenamento jurídico brasileiro.

Como uma empresa líder no fornecimento de tecnologias inteligentes e conectadas, atuando com soluções de monitoramento em tempo real para as verticais de Med Solutions, Asset Solutions e Supply Chain, a Sensoriz processa dados complexos e, por vezes, sensíveis. Para assegurar a integridade, a ética e a transparência em todas as operações, mantemos um ecossistema robusto de governança composto por políticas, diretrizes e procedimentos internos rígidos.

## 2. Definições e Conceitos Fundamentais

Para fins desta Política e em consonância com a legislação aplicável, adotam-se as seguintes definições:

- **Dado Pessoal:** Qualquer informação relacionada a uma pessoa natural identificada ou identificável.
- **Dado Pessoal Sensível:** Dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a uma pessoa natural.
- **Tratamento:** Toda e qualquer operação realizada com dados pessoais, tais como coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.
- **Controlador:** Pessoa natural ou jurídica, de direito público ou privado, a quem competem as decisões referentes ao tratamento de dados pessoais. No contexto de uso da plataforma Sensor Core por nossos clientes corporativos, o cliente atua como Controlador dos dados inseridos no sistema.
- **Operador (ou Processador):** Pessoa natural ou jurídica, de direito público ou privado, que realiza o tratamento de dados pessoais em nome do controlador. A Sensoriz atua predominantemente como Operadora ao processar a telemetria bruta e os logs operacionais em nome de seus licenciados.
- **Incidente de Segurança da Informação:** Qualquer acesso não autorizado ou acidental, ou a coleta, perda, destruição, dano ou alteração de dados pessoais.

## 3. Escopo do Tratamento e Dados Coletados

A Sensoriz coleta e trata dados estritamente necessários para a execução de seus serviços de monitoramento inteligente e gerenciamento de ativos. O ecossistema de IoT compreende dispositivos físicos (hubs ativos e tags passivas) integrados à plataforma em nuvem Sensor Core.

Os parâmetros brutos de telemetria capturados incluem, mas não se limitam a:

### Posicionamento e GPS

**Descrição Técnica:** Geolocalização híbrida baseada em GNSS, torres de celular visíveis e pontos de acesso Wi-Fi.

**Finalidade:** Rastreabilidade de remessas e criação de zonas virtuais de controle (Geofencing).

### Condições Térmicas e Climáticas

**Descrição Técnica:** Aferição contínua de Temperatura e Umidade com precisão calibrada e rastreável pelo NIST.

**Finalidade:** Conformidade regulatória para transporte de termolábeis, vacinas e segurança alimentar (Anvisa RDC 430).

### Fatores Dinâmicos

**Descrição Técnica:** Acelerômetro para detecção de impacto, queda, vibração, trepidação e orientação.

**Finalidade:** Identificação de sinistros, análise de integridade física da carga e índice de qualidade de rotas.

### Condições de Ambiente

**Descrição Técnica:** Sensor de luminosidade e sensor de pressão atmosférica.

**Finalidade:** Detecção de abertura indesejada de baús/pacotes e controle de salas cirúrgicas.

**Importante (Anonimização e LGPD):** Para mitigar riscos de privacidade e evitar o monitoramento direto de indivíduos, a Sensoriz adota o princípio de individualização e vinculação de dados a ativos ou chamados operacionais (ex: placas de veículos, IDs de dispositivos ou números de ordens de serviço), mantendo o anonimato dos profissionais e motoristas terceiros, focando o rastreamento estritamente na carga física.

## 4. Políticas e Diretrizes Internas de Proteção de Dados

A estrutura de governança da informação da empresa baseia-se em cinco pilares documentados e periodicamente revisados:

- **Política Interna de Privacidade e Proteção de Dados:** Define as regras gerais, princípios legais e matriz de responsabilidade para todas as etapas de coleta, armazenamento, uso, compartilhamento e descarte de dados.
- **Procedimento de Resposta a Incidentes de Segurança:** Estabelece um fluxo interno ágil para identificação, isolamento, investigação e remediação de incidentes ou acessos indevidos, assegurando a comunicação imediata em conformidade com as obrigações legais.
- **Diretrizes de Segurança da Informação:** Consolida controles técnicos e administrativos rigorosos, tais como autenticação de dois fatores (2FA), criptografia de dados em trânsito e em repouso (TSL 2.0 / HTTPS), gerenciamento seguro de variáveis de ambiente no cluster e políticas rígidas de senhas.
- **Orientações sobre Tratamento de Dados Sensíveis:** Regras específicas e restritivas para o manuseio de dados classificados como sensíveis pela LGPD, garantindo que o acesso ocorra estritamente sob necessidade e com camadas extras de controle.
- **Due Diligence de Fornecedores e Prestadores de Serviços:** Avaliação e auditoria contínua de parceiros comerciais e provedores de infraestrutura em nuvem (como AWS, Google Cloud e Digital Ocean), garantindo que os suboperadores sigam padrões contratuais idênticos ou superiores de conformidade à LGPD.

## 5. Retenção, Expurgo e Segurança de Dados entre Clientes

A plataforma Sensor Core assegura a segregação lógica absoluta de dados. Um cliente jamais terá acesso à telemetria ou histórico de outro licenciado, sendo implementadas árvores rígidas de perfis de acesso e mecanismos de segurança no backend (como o isolamento por coleções de IDs específicas).

Em linha com as diretrizes de governança e com as boas práticas, a Sensoriz possui uma rotina estrita de limpeza de dispositivos reaproveitados. Toda vez que um hub ou tag conclui um projeto ou Prova de Conceito (POC), os dados históricos associados àquele hardware são permanentemente limpos ou desvinculados antes de sua reatribuição, eliminando riscos de vazamento involuntário de dados mercadológicos.

Salvo disposição contratual em contrário ou necessidade de retenção por obrigação legal/regulatória, as informações confidenciais e os dados tratados serão mantidos pelo período contratado e eliminados definitivamente em até 30 (trinta) dias após o encerramento do contrato.

## 6. Responsabilidades dos Colaboradores

A conformidade com a LGPD e a segurança da informação é uma responsabilidade obrigatória e compartilhada por todos os profissionais da Soluções Tecnológicas LTDA. São deveres fundamentais de nossa equipe:

- Conhecer, compreender e aplicar rigorosamente as políticas e procedimentos de proteção de dados e segurança cibernética;
- Utilizar os dados e telemetrias coletados na plataforma única e exclusivamente para as finalidades contratuais autorizadas pelos controladores;
- Garantir o sigilo e a confidencialidade das credenciais de acesso, logins de testes e chaves criptográficas, reportando imediatamente qualquer suspeita de vulnerabilidade ou incidente;
- Participar de forma mandatória em treinamentos e reciclagens periódicas sobre segurança e governança de dados promovidos pela empresa.

## 7. Direitos dos Titulares e Canais Oficiais de Atendimento

A Sensoriz assegura aos titulares dos dados o exercício pleno de seus direitos previstos no artigo 18 da LGPD (confirmação de existência, acesso, correção, anonimização, portabilidade, eliminação, entre outros).

Para o esclarecimento de dúvidas, requisições de titulares, reportes de incidentes ou comunicações éticas, a Sensoriz disponibiliza canais oficiais centralizados e dotados de total confidencialidade, seriedade e proteção contra retaliação:

**Canal do Encarregado de Dados (DPO):** [privacidade@sensoriz.com.br](mailto:privacidade@sensoriz.com.br)  
 **Canal de Denúncias, Ética e Ouvidoria:** [ouvidoria@sensoriz.com.br](mailto:ouvidoria@sensoriz.com.br)
