-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04-Jun-2020 às 15:33
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
-- Estrutura da tabela `favoritos`
--

CREATE TABLE `favoritos` (
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `filmes_series`
--

CREATE TABLE `filmes_series` (
  `id` int NOT NULL,
  `titulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `descricao` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `url_poster` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `url_imdb` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `url_youtube` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `genero` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `data_lancamento` date NOT NULL,
  `tipo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `usuario_id` int NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `filmes_series`
--

INSERT INTO `filmes_series` (`id`, `titulo`, `descricao`, `url_poster`, `url_imdb`, `url_youtube`, `genero`, `data_lancamento`, `tipo`, `usuario_id`, `data_criacao`) VALUES
(1, 'Star Wars: Episode IX - The Rise of Skywalker', 'The surviving members of the resistance face the First Order once again, and the legendary conflict between the Jedi and the Sith reaches a new level.', 'https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SY1000_CR0,0,675,1000_AL_.jpg', 'https://www.imdb.com/title/tt2527338/', 'https://www.youtube.com/watch?v=LYutHgaXjyI', 'Ação', '1985-12-28', 'filme', 1, '2020-04-22 20:40:52'),
(2, 'Uncut Gems', 'With his debts mounting and angry collectors closing in, a fast-talking New York City jeweler risks everything in hope of staying afloat and alive.', 'https://m.media-amazon.com/images/M/MV5BZDhkMjUyYjItYWVkYi00YTM5LWE4MGEtY2FlMjA3OThlYmZhXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,640,1000_AL_.jpg', 'https://www.imdb.com/title/tt5727208/', 'https://www.youtube.com/watch?v=OEEZ_wFAKyw', 'Drama', '2020-01-31', 'filme', 1, '2020-04-22 21:38:20'),
(3, 'Friends', 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.', 'https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg', 'https://www.imdb.com/title/tt0108778/', 'https://www.youtube.com/watch?v=Gpa5S8DgPzs', 'Comédia', '1996-02-06', 'seriado', 1, '2020-04-22 21:41:48'),
(4, 'Formula 1: Drive to Survive', 'Docuseries following the 2018 FIA Formula One World Championship.', 'https://m.media-amazon.com/images/M/MV5BMzVkMGU0YWMtOWQxMC00MjFhLTg1NjAtMDFlZTZlYzJlMjlhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', 'https://www.imdb.com/title/tt8289930/', 'https://www.youtube.com/watch?v=wtJPe1ksS6E', 'Documentário', '2019-03-09', 'seriado', 1, '2020-04-22 21:45:28'),
(5, 'Star Wars: Episode V - Return of Jedi', 'After a daring mission to rescue Han Solo from Jabba the Hutt, the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, Luke struggles to help Darth Vader back from the dark side without falling into the Emperor\'s trap.', 'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY999_CR0,0,644,999_AL_.jpg', 'https://www.imdb.com/title/tt8289930/?ref_=rvi_tt', 'https://www.youtube.com/watch?v=7L8p7_SLzvU', 'Ação', '1984-12-28', 'filme', 1, '2020-04-23 19:46:52'),
(6, 'Back To The Future', 'teste', 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,643,1000_AL_.jpg', 'https://www.imdb.com/title/tt0088763/?ref_=nv_sr_srsg_0', 'https://www.youtube.com/watch?v=qvsgGtivCgs', 'Ação', '1985-12-28', 'filme', 1, '2020-04-23 20:11:06'),
(7, 'The Fresh Prince of Bel-Air', 'A streetwise, poor young man from Philadelphia is sent by his mother to live with his aunt, uncle and cousins in their Bel-Air mansion.', 'https://m.media-amazon.com/images/M/MV5BOGUxOWQ4MzAtMmJjYS00M2U5LWEwZTAtYTc1YmZhNjg2NDRlXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_.jpg', 'https://www.imdb.com/title/tt0098800/', 'https://www.youtube.com/watch?v=ec6NXh0juGA', 'Comédia', '1990-01-01', 'seriado', 1, '2020-05-12 09:21:30'),
(8, 'Coringa', 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.', 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg', 'https://www.imdb.com/title/tt7286456/?ref_=hm_fanfav_tt_2_pd_fp1', 'https://www.youtube.com/watch?v=jfVTJm9NilA', 'Drama', '2019-10-03', 'filme', 1, '2020-06-04 11:35:19'),
(9, '1971', 'April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.', 'https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_SY1000_CR0,0,631,1000_AL_.jpg', 'https://www.imdb.com/title/tt8579674/?ref_=hm_fanfav_tt_5_pd_fp1', 'https://www.youtube.com/watch?v=dglqGGyWbVo', 'Ação', '2020-01-23', 'filme', 1, '2020-06-04 11:36:25'),
(10, 'The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg', 'https://www.imdb.com/title/tt0068646/?ref_=hm_stp_pvs_piv_tt_3', 'https://www.youtube.com/watch?v=y_-YWEot_7w', 'Drama', '1972-09-10', 'filme', 1, '2020-06-04 11:37:51'),
(11, 'Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,686,1000_AL_.jpg', 'https://www.imdb.com/title/tt0110912/?ref_=hm_stp_pvs_piv_tt_5', 'https://www.youtube.com/watch?v=s7EdQ4FqbhY', 'Drama', '1995-03-03', 'filme', 1, '2020-06-04 11:40:04'),
(12, 'Forrest Gump', 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.', 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg', 'https://www.imdb.com/title/tt0109830/?ref_=hm_stp_pvs_piv_tt_11', 'https://www.youtube.com/watch?v=bLvqoHBptjg', 'Drama', '1994-12-07', 'filme', 1, '2020-06-04 11:41:12'),
(13, 'Fight Club', 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.', 'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,666,1000_AL_.jpg', 'https://www.imdb.com/title/tt0137523/?ref_=hm_stp_pvs_piv_tt_12', 'https://www.youtube.com/watch?v=qtRKdVHc-cE', 'Drama', '1999-10-29', 'filme', 1, '2020-06-04 11:42:59'),
(14, 'Gladiator', 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,675,1000_AL_.jpg', 'https://www.imdb.com/title/tt0172495/?ref_=hm_stp_pvs_piv_tt_14', 'https://www.youtube.com/watch?v=-yOZEiHLuVU', 'Ação', '2000-05-19', 'filme', 1, '2020-06-04 11:43:51'),
(15, 'Oceans Eleven', 'Danny Ocean and his ten accomplices plan to rob three Las Vegas casinos simultaneously.', 'https://m.media-amazon.com/images/M/MV5BYzVmYzVkMmUtOGRhMi00MTNmLThlMmUtZTljYjlkMjNkMjJkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,675,1000_AL_.jpg', 'https://www.imdb.com/title/tt2527338/mediaviewer/rm1361479681', 'https://www.youtube.com/watch?v=n3epi9hPbqQ', 'Ação', '2002-02-22', 'filme', 1, '2020-06-04 12:13:09'),
(16, 'Rick e Morty ', 'An animated series that follows the exploits of a super scientist and his not-so-bright grandson.', 'https://m.media-amazon.com/images/M/MV5BMjRiNDRhNGUtMzRkZi00MThlLTg0ZDMtNjc5YzFjYmFjMmM4XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg', 'https://www.imdb.com/title/tt2861424/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=332cb927-0342-42b3-815c-f9124e84021d&pf_rd_r=C5Z8N3QR9J3GMFXKBAFK&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=tvmeter&ref_=chttvm_tt_9', 'https://www.youtube.com/watch?v=hl1U0bxTHbY', 'Comédia', '2013-12-02', 'seriado', 1, '2020-06-04 12:35:04'),
(17, 'Stranger Things ', 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.', 'https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg', 'https://www.imdb.com/title/tt4574334/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=332cb927-0342-42b3-815c-f9124e84021d&pf_rd_r=JZ8BKC5PSPPPXRNYCYAP&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=tvmeter&ref_=chttvm_tt_48', 'https://www.youtube.com/watch?v=QsYMm3OOLRU', 'Aventura', '2020-06-16', 'seriado', 1, '2020-06-04 12:36:36'),
(18, 'The Mandalorian', 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.', 'https://m.media-amazon.com/images/M/MV5BMWI0OTJlYTItNzMwZi00YzRiLWJhMjItMWRlMDNhZjNiMzJkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,675,1000_AL_.jpg', 'https://www.imdb.com/title/tt8111088/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=332cb927-0342-42b3-815c-f9124e84021d&pf_rd_r=JZ8BKC5PSPPPXRNYCYAP&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=tvmeter&ref_=chttvm_tt_52', 'https://www.youtube.com/watch?v=XmI7WKrAtqs', 'Aventura', '2020-03-24', 'seriado', 1, '2020-06-04 12:38:00');

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
(1, 'rafaelfborges@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Rafael Borges', '1985-12-28', '41991234567', '83035170', 'Rua Aristides França', 999, 'Casa', 'São José dos Pinhais', 'Cidade Jardim', 'admin', NULL, NULL, NULL, NULL, 1, '2020-04-21 20:10:42'),
(2, 'rafaelfborges@hotmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Rafael Borges', '1985-12-28', '41991234567', '83035170', 'Rua Aristides França', 999, 'Casa', 'São José dos Pinhais', 'Cidade Jardim', 'usuario', NULL, NULL, NULL, NULL, 1, '2020-05-30 00:56:20');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`user_id`,`movie_id`),
  ADD KEY `movie_id` (`movie_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `usuarios_dados`
--
ALTER TABLE `usuarios_dados`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios_dados` (`id`),
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `filmes_series` (`id`);

--
-- Limitadores para a tabela `filmes_series`
--
ALTER TABLE `filmes_series`
  ADD CONSTRAINT `usuario_id_fk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_dados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
