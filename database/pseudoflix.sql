-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 16-Abr-2020 às 23:06
-- Versão do servidor: 8.0.19
-- versão do PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `pseudoflix`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `filmes_series`
--

CREATE TABLE `filmes_series` (
                                 `id` int NOT NULL,
                                 `titulo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
                                 `descricao` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                 `url_poster` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                 `url_imdb` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                 `genero` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                 `data_lancamento` date NOT NULL,
                                 `usuario_id` int NOT NULL,
                                 `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 `data_atualizacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios_dados`
--

CREATE TABLE `usuarios_dados` (
                                  `id` int NOT NULL,
                                  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                  `senha` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                  `nome_completo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                  `data_nascimento` date NOT NULL,
                                  `telefone` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                  `cep` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                  `endereco` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                  `numero` int NOT NULL,
                                  `complemento` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                                  `cidade` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                  `bairro` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                  `tipo_usuario` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'guest',
                                  `tipo_assinatura` tinyint DEFAULT NULL,
                                  `numero_cartao` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                                  `digito_verificador` int DEFAULT NULL,
                                  `validade_cartao` date DEFAULT NULL,
                                  `flag_confirmacao` tinyint NOT NULL DEFAULT '0',
                                  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  `data_atualizacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuarios_dados`
--

INSERT INTO `usuarios_dados` (`id`, `email`, `senha`, `nome_completo`, `data_nascimento`, `telefone`, `cep`, `endereco`, `numero`, `complemento`, `cidade`, `bairro`, `tipo_usuario`, `tipo_assinatura`, `numero_cartao`, `digito_verificador`, `validade_cartao`, `flag_confirmacao`, `data_criacao`) VALUES
(1, 'rafaelfborges@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Rafael Fernando Borges', '1985-12-28', '41991342581', '83035170', 'Rua Aristides França', 584, '', 'São José dos Pinhais', 'Cidade Jardim', 'guest', NULL, NULL, NULL, NULL, 1, '2020-04-16 20:21:48'),
(5, 'rafaelfborges@hotmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Rafael Borges', '1985-12-28', '41991342581', '83035170', 'Rua Aristides França', 584, '', 'São José dos Pinhais', 'Cidade Jardim', 'guest', NULL, NULL, NULL, NULL, 0, '2020-04-16 20:29:14');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `filmes_series`
--
ALTER TABLE `filmes_series`
    ADD PRIMARY KEY (`id`),
    ADD KEY `usuario_id` (`usuario_id`) USING BTREE;

--
-- Índices para tabela `usuarios_dados`
--
ALTER TABLE `usuarios_dados`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `filmes_series`
--
ALTER TABLE `filmes_series`
    MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios_dados`
--
ALTER TABLE `usuarios_dados`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `filmes_series`
--
ALTER TABLE `filmes_series`
    ADD CONSTRAINT `usuario_id_fk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_dados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
