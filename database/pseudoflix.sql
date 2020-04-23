-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23-Abr-2020 às 22:01
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
  `tipo` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `usuario_id` int NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `filmes_series`
--

INSERT INTO `filmes_series` (`id`, `titulo`, `descricao`, `url_poster`, `url_imdb`, `genero`, `data_lancamento`, `tipo`, `usuario_id`, `data_criacao`) VALUES
(1, 'Star Wars: Episode IX - The Rise of Skywalker', 'The surviving members of the resistance face the First Order once again, and the legendary conflict between the Jedi and the Sith reaches a new level.', 'https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SY1000_CR0,0,675,1000_AL_.jpg', 'https://www.imdb.com/title/tt2527338/', 'Ação', '1985-12-28', 'Filme', 1, '2020-04-22 20:40:52'),
(2, 'Uncut Gems', 'With his debts mounting and angry collectors closing in, a fast-talking New York City jeweler risks everything in hope of staying afloat and alive.', 'https://m.media-amazon.com/images/M/MV5BZDhkMjUyYjItYWVkYi00YTM5LWE4MGEtY2FlMjA3OThlYmZhXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,640,1000_AL_.jpg', 'https://www.imdb.com/title/tt5727208/', 'Drama', '2020-01-31', 'Filme', 1, '2020-04-22 21:38:20'),
(3, 'Friends', 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.', 'https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg', 'https://www.imdb.com/title/tt0108778/', 'Comédia', '1996-02-06', 'Série', 1, '2020-04-22 21:41:48'),
(4, 'Formula 1: Drive to Survive', 'Docuseries following the 2018 FIA Formula One World Championship.', 'https://m.media-amazon.com/images/M/MV5BMzVkMGU0YWMtOWQxMC00MjFhLTg1NjAtMDFlZTZlYzJlMjlhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', 'https://www.imdb.com/title/tt8289930/', 'Documentário', '2019-03-09', 'Série', 1, '2020-04-22 21:45:28'),
(5, 'Star Wars: Episode V - Return of Jedi', 'Teste', 'https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SY1000_CR0,0,675,1000_AL_.jpg', 'https://www.imdb.com/title/tt8289930/?ref_=rvi_tt', 'Ação', '1984-12-28', 'Filme', 1, '2020-04-23 19:46:52');

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
  `tipo_usuario` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'usuario',
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
(1, 'rafaelfborges@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Rafael Fernando Borges', '1985-12-28', '41991342581', '83035170', 'Rua Aristides França', 584, '', 'São José dos Pinhais', 'Cidade Jardim', 'admin', NULL, NULL, NULL, NULL, 1, '2020-04-21 20:10:42'),
(2, 'rafaelfborges@hotmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Rafael Fernando Borges', '1985-12-28', '41991342581', '83035070', 'Rua Padre Alberto Müller', 382, '', 'São José dos Pinhais', 'Cidade Jardim', 'usuario', NULL, NULL, NULL, NULL, 1, '2020-04-23 05:24:41');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `filmes_series`
--
ALTER TABLE `filmes_series`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `titulo_UNIQUE` (`titulo`) USING BTREE,
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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `usuarios_dados`
--
ALTER TABLE `usuarios_dados`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
