-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19-Mar-2020 às 21:32
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
-- Estrutura da tabela `tb_dados_usuarios`
--

CREATE TABLE `tb_dados_usuarios` (
  `id` int NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `senha` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nome_completo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `data_nascimento` date NOT NULL,
  `telefone` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cep` varchar(9) COLLATE utf8mb4_general_ci NOT NULL,
  `endereco` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `complemento` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cidade` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bairro` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `numero_cartao` varchar(16) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `digito_verificador` int DEFAULT NULL,
  `validade_cartao` date DEFAULT NULL,
  `tipo_assinatura` tinyint DEFAULT NULL,
  `flag_confirmacao` tinyint DEFAULT NULL,
  `data_criacao` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tb_dados_usuarios`
--

INSERT INTO `tb_dados_usuarios` (`id`, `email`, `senha`, `nome_completo`, `data_nascimento`, `telefone`, `cep`, `endereco`, `complemento`, `cidade`, `bairro`, `numero_cartao`, `digito_verificador`, `validade_cartao`, `tipo_assinatura`, `flag_confirmacao`, `data_criacao`) VALUES
(1, 'rafaelfborges@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Rafael Borges', '1985-12-28', '41991342581', '83035170', 'Rua Aristides França, 584', 'Casa', 'São José dos Pinhais', 'Cidade Jardim', NULL, NULL, NULL, NULL, 1, '2020-03-19 20:19:39'),
(2, 'rafaelfborges@hotmail.com', '202cb962ac59075b964b07152d234b70', 'Rafael Borges', '1985-12-28', '41991342581', '83035170', 'Rua Aristides França, 584', 'Casa', 'São José dos Pinhais', 'Cidade Jardim', NULL, NULL, NULL, NULL, 1, '2020-03-19 20:24:23');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_dados_usuarios`
--
ALTER TABLE `tb_dados_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_dados_usuarios`
--
ALTER TABLE `tb_dados_usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
