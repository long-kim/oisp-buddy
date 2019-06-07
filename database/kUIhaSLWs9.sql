-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 07, 2019 at 02:57 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kUIhaSLWs9`
--

-- --------------------------------------------------------

--
-- Table structure for table `Friends`
--

CREATE TABLE `Friends` (
  `id` int(11) NOT NULL,
  `status` smallint(6) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_one_id` int(11) DEFAULT NULL,
  `user_two_id` int(11) DEFAULT NULL,
  `action_user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `Friends`
--

INSERT INTO `Friends` (`id`, `status`, `createdAt`, `updatedAt`, `user_one_id`, `user_two_id`, `action_user_id`) VALUES
(1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2, 1),
(2, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 3, 2),
(3, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 5, 2),
(4, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 6, 2),
(5, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 3, 1),
(6, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 6, 6),
(7, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3, 4, 4),
(8, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3, 7, 7),
(9, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 4, 7, 4),
(10, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 5, 7, 5),
(11, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 6, 7, 6),
(12, 1, '2019-05-20 05:22:31', '2019-05-20 05:23:22', 1, 4, 4),
(13, 0, '2019-05-22 06:18:38', '2019-05-22 06:18:38', 3, 6, 3),
(14, 1, '2019-06-02 12:15:50', '2019-06-03 10:26:30', 13, 1, 1),
(15, 1, '2019-06-02 12:18:02', '2019-06-03 10:27:44', 14, 2, 2),
(16, 1, '2019-06-02 12:28:24', '2019-06-04 13:21:51', 14, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Posts`
--

CREATE TABLE `Posts` (
  `post_id` int(11) NOT NULL,
  `content` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `score` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `posted_by` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `content_of` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `Posts`
--

INSERT INTO `Posts` (`post_id`, `content`, `score`, `createdAt`, `updatedAt`, `posted_by`, `parent_id`, `content_of`) VALUES
(1, 'Tempora aperiam mollitia in voluptas et reprehenderit eum. Accusamus harum est. Consectetur quidem aliquam nobis. Debitis maiores nihil. Enim possimus assumenda perspiciatis est et cumque recusandae dicta fugiat. Vero sed eos laudantium. Quae dolor aut amet ea nobis odio esse id. Dolore quam eius vel architecto blanditiis eos dolor cum sed. Perferendis cumque ut nihil quam repellat rerum. Et dignissimos omnis sint qui debitis magni dolores veniam sint. Velit dolorem id harum ut ducimus non hic dicta et. Nostrum et inventore repellendus labore et.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 1, 1),
(2, 'Voluptates aperiam corporis est perferendis culpa voluptas voluptatibus. Eius necessitatibus nobis qui et sunt et et adipisci. Molestias rerum reiciendis vel neque perspiciatis. Occaecati ea dolores non architecto corrupti repudiandae praesentium. Aut cum qui aut illum culpa deserunt iure. Quia quaerat ut. Qui sed illum doloremque sapiente accusantium aut vel enim deserunt. Omnis quisquam minima fugit maxime et deleniti eos est. Quisquam repellendus laboriosam corrupti. Nobis hic quo ut et qui quo voluptates. Magni repellendus repellat sunt tempora totam molestiae dicta explicabo. Quas nam similique qui non adipisci in. Quisquam et reiciendis alias soluta.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 2, 2),
(3, 'Nostrum natus repudiandae et possimus repellendus exercitationem sint et molestiae. Doloribus laborum autem expedita odio. Velit vel saepe excepturi sit molestiae blanditiis. Id ea iusto et nihil et. Maiores ut est culpa et consectetur dolorem earum. Repellendus earum voluptate dolores necessitatibus possimus sit. Aut iste animi sed ex iusto. Sint quisquam neque voluptatem autem. Et qui natus autem facilis temporibus. Autem sit nemo facilis ab ut. Tenetur non voluptatibus sint dignissimos nihil dolorem corporis animi reprehenderit.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 3, 3),
(4, 'Omnis quasi odio itaque possimus molestiae. Libero similique est alias enim cupiditate consequuntur sunt aut dolores. Consectetur nihil doloremque molestias. Aliquid sed porro reiciendis. Quas sed et autem accusamus facilis aspernatur reprehenderit cum. Enim voluptatem aspernatur sequi. Cum voluptatem et ex. Sit nam asperiores alias id aut fugit veritatis vero illum. Minima temporibus eius perferendis dolores enim distinctio veritatis voluptatem. Maxime expedita temporibus autem autem nulla enim perspiciatis quisquam optio. Hic quod velit rerum. Molestiae molestias quis quo numquam quia nobis ratione et.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 4, 4),
(5, 'Suscipit cupiditate ducimus vel magni praesentium temporibus. Corrupti dolorem quaerat qui ut. Natus incidunt odit consectetur. Et sint unde quo ducimus non quis quia distinctio. Sint ea natus alias autem aut ea. Voluptatem ea exercitationem est ut dolorem rerum. Qui optio sint quod. Ex accusamus nesciunt deserunt. Maxime quam et minima sed sapiente ut odit et. Iste cupiditate ipsa aliquid itaque nihil alias. Eaque consequuntur voluptatibus maxime quia in. Debitis perspiciatis cum magni. Et delectus nisi soluta possimus nesciunt molestiae voluptatibus corporis quis.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 5, 5),
(6, 'Totam aut similique iusto iste porro voluptate minus voluptatem. Nobis itaque voluptatem aut. Ea adipisci laborum repudiandae. Omnis sed labore voluptatem. Voluptatem deserunt distinctio dolores eum sint voluptatibus. Et aliquid nobis culpa provident maiores voluptatem et. Laborum nemo maxime aut laboriosam qui non aut praesentium. Molestias voluptas beatae doloribus molestiae pariatur nostrum est. Vero debitis quo incidunt placeat laboriosam eos aperiam rem quis. Numquam quas facere sapiente rerum. Ipsum dolores et aut commodi.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 6, 6),
(7, 'Qui quam soluta alias. Ut laborum delectus ipsam accusantium voluptatem sint laborum nostrum. Sunt ad illum. Laudantium sed placeat impedit temporibus ratione nam corrupti quis provident. Magnam pariatur rerum voluptatem est aut ea. Aperiam rerum voluptatem accusamus eveniet voluptate. Sit dolores voluptatem qui cumque perferendis. Dolorum omnis qui quis et quas. Sint est quaerat qui quia. Aut rerum eum eos quos velit eos sed quod. Numquam aspernatur eos vel rerum ipsa ipsa debitis.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 6, NULL),
(8, 'Sint placeat dolores quibusdam iste nihil. Deleniti perferendis explicabo aut recusandae. Sunt ut asperiores. Iure non expedita quae fugit aspernatur rerum. Iure ut maxime dicta dolorem. Neque est ut. Ut aliquid ut soluta. Laudantium aspernatur molestias. Recusandae temporibus quaerat quibusdam ratione ullam eligendi quod in quod. Nesciunt asperiores voluptatum ipsum ab. Animi iste quibusdam possimus. Quaerat non molestiae dicta commodi eligendi quae ducimus quia. Quae corrupti id quia quaerat.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 5, NULL),
(9, 'Sapiente sed voluptatibus amet sint architecto sapiente recusandae blanditiis quia. Perferendis fuga enim fuga molestias et expedita maxime. Perspiciatis consequatur ut aut. Voluptatibus enim qui eligendi est itaque et. Quia sed voluptas beatae consectetur. Illo optio quo est consequatur consequatur ut. Deleniti ut laudantium earum possimus blanditiis provident perferendis. Magni esse voluptatem quia est rerum dolor ipsum et. Ducimus qui voluptas. Aut est dolor aut id explicabo facere temporibus.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 6, NULL),
(10, 'Quia porro quisquam enim eligendi porro. Quia explicabo incidunt accusamus. Laudantium voluptatem est dignissimos a molestias. Illum earum perspiciatis atque magni laboriosam est. Deserunt et earum vel dolore. Laborum asperiores ipsa accusantium est rerum et reprehenderit atque. Cumque qui et voluptas. Ipsa enim qui aut asperiores temporibus fuga error non autem. Qui molestiae a saepe cum voluptas quidem. Id fuga repellendus earum laboriosam deserunt et optio necessitatibus. Rem at libero. Libero voluptate sint consequatur assumenda mollitia. Sunt animi sit est quos corporis.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 4, NULL),
(11, 'Repellendus excepturi labore vel repudiandae recusandae placeat ratione rem et. Minima laborum dolorem quasi est quibusdam quos culpa omnis eum. Qui velit in molestias. Consequuntur ratione molestiae blanditiis hic libero perspiciatis minima dolore. Nulla deserunt sequi unde. Exercitationem facilis aperiam fuga omnis aliquid ut. Provident architecto ut ullam qui tempore. Qui aut doloribus. Est consectetur rem. Id omnis dolorum debitis ea molestiae molestias ex. Labore blanditiis similique animi odit et. Aperiam in et blanditiis. Nisi nobis eos quos reprehenderit deserunt.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 5, NULL),
(12, 'Quos vitae magni vero explicabo in et iusto vero quis. A quae et magni omnis et voluptate et. Distinctio aliquam asperiores minima ratione ex et. Molestias voluptas minima. Dolore perferendis tempora dolor et et. Repellendus rem id minima harum eum quos consequatur repellendus sit. Odit magni saepe. Voluptatem et voluptatem illo veniam. Asperiores ratione ratione quaerat deleniti asperiores eos rerum. Est at voluptates at enim minima.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 5, NULL),
(13, 'Eos at pariatur aut libero commodi magni. Atque ipsa quo. Quis nostrum voluptate. Et ex harum atque ullam. Modi non qui voluptate consequatur consequatur. Dolore ut aliquid quidem. Et ab qui dicta. Deserunt dolorem et eum beatae et dolor et ipsum. Et eaque et deserunt error repudiandae qui eos. Nihil incidunt est aut provident neque. Quis et magnam tempore. Officia dicta nulla labore. Quis unde ut et nesciunt.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 6, NULL),
(14, 'Dolores itaque dolore in modi est officia odit quae perspiciatis. Neque deserunt placeat. Impedit aut repudiandae repudiandae qui ea facere commodi rerum. Vero fugiat laborum temporibus occaecati deleniti nihil. Ratione corporis ut dignissimos inventore. Incidunt nulla est velit error est. Vero maxime ipsa similique fugit dolorem dolore eos quo quod. Beatae rerum accusantium nulla in ipsa delectus officia deserunt. Delectus est placeat optio atque sint est totam saepe. Quis ut in tempora.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 2, NULL),
(15, 'Qui cum amet. Dolores perferendis quas. Eaque praesentium quo dolor ea et voluptatem nisi qui quis. In ut quidem aliquid consequatur itaque blanditiis officiis quod deserunt. Ut cum et quo et qui quaerat laboriosam voluptas tempore. Ut magnam itaque. Facilis autem dolorum aliquam officiis in non. Dolorem dolorum eaque atque dolor aut voluptatem facilis. Sunt quo nulla perspiciatis quia omnis quisquam est dolorem laudantium. Id consequuntur et deleniti vero quas voluptatem.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 4, NULL),
(16, 'Possimus molestias ut nesciunt sunt autem delectus eum nisi quia. Sed quis delectus ut. Quae qui fuga dignissimos voluptatum qui assumenda expedita omnis. Dolorem rerum voluptate velit non. Eum sit temporibus quos. Dolores aut ut dolor sequi. Aut voluptates non voluptas sed impedit vel ab animi quia. Fugit et tempora officia in veniam facere natus et. Magnam suscipit sit maxime qui quos minus. Iure placeat repudiandae molestiae aut. Id saepe adipisci incidunt et officia enim officiis quidem. Numquam illo dolor aut est ipsum officia quia aperiam.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 5, NULL),
(17, 'Atque excepturi voluptatem dolorem. Et molestiae nihil reprehenderit enim. Officia quisquam facilis accusamus voluptas amet dolorum eum. Et laborum rerum fuga ut. Maxime aliquid non voluptatem repudiandae qui. Inventore incidunt natus accusantium illo. Officia aut magnam excepturi accusantium animi ratione aut nihil. Quis qui aut sint inventore consequatur. Cumque omnis quod explicabo sunt molestiae. Voluptas excepturi temporibus tempore ut perspiciatis quas excepturi repellendus non. Soluta aliquid ipsam. Quia in et adipisci sunt cumque et cupiditate amet. Harum consequatur quis quibusdam delectus qui ipsum aliquam in nihil.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 2, NULL),
(18, 'Itaque voluptates quo rem nesciunt voluptatem nemo dicta. Consequatur voluptatum tenetur. Et explicabo laborum dolorum soluta eos. Eaque quia nobis aut et eligendi fugit eum. Numquam minima accusantium corporis ducimus aut qui unde aut. Culpa et quibusdam dolor saepe quae esse qui assumenda nisi. Sit laboriosam impedit incidunt maiores aperiam neque assumenda. Omnis iusto assumenda tempore molestias sit. Dolores omnis cupiditate labore eum quia quisquam. Eos amet minus tempore delectus consequuntur dignissimos ratione provident totam. Quia numquam optio maxime ut molestias culpa magnam incidunt. Quisquam voluptatibus sint dolorem cupiditate facere qui deleniti laboriosam.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 6, NULL),
(19, 'Blanditiis tenetur laborum explicabo. Est et ratione. Autem molestiae soluta aut quo et exercitationem. Eos amet voluptatum animi inventore debitis. Voluptatem quia velit amet officiis architecto et voluptas impedit voluptatum. Ducimus necessitatibus expedita fugit molestias ut. Aliquid pariatur ducimus saepe quia eaque. Deleniti maxime at sint non atque. Quia perferendis consectetur quas officia. Inventore et possimus dolores et. Nulla autem nesciunt quia voluptates sed qui optio adipisci sit. Quis dicta magni adipisci.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 3, NULL),
(20, 'Omnis nesciunt fugiat ipsam qui. Soluta enim fugiat aut sed ut sunt ea. Optio tempora itaque qui. Dolore placeat quo ut natus quo necessitatibus placeat recusandae. Qui nulla eos rem excepturi omnis expedita. Rerum autem nesciunt doloribus maiores. Eum iure et in illum dolore voluptas. Consequatur laboriosam deleniti neque esse accusamus. Consectetur illum repellendus aliquid a nobis excepturi aperiam. Blanditiis itaque eveniet.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 1, NULL),
(21, 'Rerum commodi debitis aliquam facere. Repellendus tempore placeat omnis ea soluta voluptates ad maiores. Excepturi vitae esse. Magni nostrum quos accusantium blanditiis id illo veritatis quos nobis. Atque similique aut alias nulla ullam dolorem. Quo voluptatum voluptatem perspiciatis autem. Sit recusandae velit hic odit corrupti veritatis pariatur repudiandae a. Est optio sit delectus minima qui placeat corporis quo rem. Debitis vel officiis sapiente molestiae optio. Et ea blanditiis esse facere quia voluptatum. Dolorem cumque sint eius voluptatem corrupti exercitationem dolores itaque et. Quos quia sunt sed incidunt quos. Deleniti ut tenetur impedit consectetur rerum enim.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 1, NULL),
(22, 'Cupiditate cum nostrum facilis nemo officia et. Qui explicabo aut ab quae ex quo et. Accusantium animi magni nihil omnis dicta earum omnis ut. Aut non saepe. Accusamus recusandae doloremque. Dolore eligendi et non atque et. Quaerat sequi voluptatem quia voluptas ea id dolores suscipit fuga. Autem qui est dolorem et ut possimus mollitia numquam inventore. Ea qui nesciunt. Mollitia excepturi asperiores deleniti blanditiis repellendus at corrupti. Perspiciatis sapiente similique fugiat possimus nostrum.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 1, NULL),
(23, 'Porro et provident a dolores vero natus omnis fugit. Alias tenetur rerum quaerat vitae. Natus impedit dolor quia. Dolorem aut est iure harum animi laboriosam quod nisi quae. Nihil reiciendis sed quam. Dicta tempore id delectus repellat id in earum. Reiciendis commodi eius unde cum adipisci aliquam alias. Occaecati rerum nobis ipsam aspernatur voluptas. Soluta aliquam ipsa impedit est quia velit rerum molestias. Ut quia est eum qui quia dolorem velit quia maiores.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 1, NULL),
(24, 'Ratione reprehenderit in nostrum dolor. Eos nostrum animi consequatur voluptatem et praesentium commodi praesentium suscipit. Excepturi ea qui quas. Ut vitae quis quaerat. Omnis pariatur et ut dicta architecto eos eum. Aspernatur quaerat iusto asperiores illum facere maxime aliquid totam. Perspiciatis blanditiis est voluptas in quo et dolor cumque est. Molestiae ullam voluptatem hic id libero debitis libero et quas. Aut sit quae voluptatem. Alias eos aut voluptatem quo voluptatibus excepturi excepturi numquam enim. Sed autem nihil.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 1, NULL),
(25, 'Necessitatibus vel in eos vitae alias eaque sed veritatis. Earum molestias expedita repellendus cumque. Voluptates voluptate rerum id. Porro ad sit impedit reiciendis. Earum minima est sed cupiditate fugiat sed libero et ullam. Suscipit voluptate soluta. Alias consequuntur ipsa blanditiis ab iste dolorem molestiae expedita voluptatibus. Molestiae adipisci sint commodi sit magnam sint maiores iste non. Atque aut aut tempore non facere eos. Facilis cumque vitae.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 6, NULL),
(26, 'Eligendi itaque aperiam modi cupiditate. Aut nulla et. Eveniet dolor id expedita est voluptas inventore laudantium. Fuga possimus aut quam eum harum voluptatum culpa. Enim officia dolore facere omnis est molestiae eos voluptatem. Non quia ut quam vero non nobis eveniet doloribus. Nihil sed odio velit commodi. Atque doloremque ab voluptates rem sit. Velit nesciunt possimus dolor excepturi. Quia optio quo.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 5, NULL),
(27, 'Voluptatem distinctio quia quis dolore. Ut optio vel earum ex distinctio corporis sint voluptas. Alias nihil animi. Fuga sint veniam eos ex possimus ut. Non ut qui qui. Rem et et. Libero nihil vero qui aut ipsum sit sunt. Est aut quas voluptas ipsam molestiae at. Dolores cumque laudantium. Temporibus ducimus iusto earum delectus iste consequuntur. Expedita laboriosam voluptatibus vero eum fugiat.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 5, NULL),
(28, 'Et veniam et reiciendis rerum asperiores et sapiente dolorum. Sint et qui et exercitationem. Sit vel est consequatur dicta quidem nesciunt voluptas autem. Saepe qui voluptas ipsa qui numquam iure. Nihil totam qui fuga sunt quod. Vitae officia doloremque ex facere. Error esse repellendus perferendis provident in ipsum reiciendis. Non voluptate totam. Sed perferendis sint aut adipisci qui. Magnam rerum non ex porro itaque voluptates sunt nam. Iusto voluptates rerum maiores rerum repellendus.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 5, NULL),
(29, 'Debitis odio et. Repellendus sint aut assumenda repellat est qui. Facilis ut qui vel dolor ratione ut laboriosam unde. Ut totam ea omnis blanditiis. Non dolor quis aut aut corporis accusantium. Doloremque repellendus nisi molestiae officiis non architecto asperiores. Aut accusamus repudiandae cum dolor totam expedita et eos vel. Doloremque et voluptatem voluptates aut neque dignissimos sunt sit ipsa. Sed omnis vero. Voluptatem deserunt sit architecto. Explicabo ut non facilis vel nesciunt id. Voluptatum numquam neque quo eius sequi est odit. Aut hic est est.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 5, NULL),
(30, 'Quibusdam nemo asperiores ducimus eveniet iste. Tempore velit ipsam et est odit voluptatibus ipsam deserunt quam. Magnam non voluptatem et sunt consequatur beatae eum vel provident. Aut quisquam neque quia temporibus. Ea accusantium accusantium fugiat. Omnis libero architecto molestiae harum iste laudantium in optio. Et labore et dolores minus et. Asperiores debitis tempore sed rerum dolorem et qui placeat officia. Autem rerum cum reiciendis veniam commodi similique omnis ipsa. Architecto delectus est aliquam maiores dolorem dignissimos odio.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 5, NULL),
(31, 'Molestiae et officiis quasi ea. Pariatur error voluptate voluptatem. Sint aut dolores dicta dolorem est quisquam eos rem et. Velit vel asperiores eum et eos consectetur. Hic eligendi dolores libero. Et ut laboriosam repudiandae natus voluptate consequatur ipsa dolor veniam. Neque provident rerum deleniti voluptatem porro asperiores possimus repellat. Illo similique consectetur id reprehenderit. Quia eos aut. Voluptatibus fugit labore. Delectus et mollitia. Ullam id laudantium dolores excepturi repellat provident molestiae nihil.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 2, NULL),
(32, 'Et alias eos ut saepe vero ut. Quo maxime optio est. Consequuntur optio voluptatum magnam a. Harum molestiae quibusdam ex rem debitis. Maiores aperiam inventore. Non praesentium saepe dolorem commodi ad occaecati voluptatibus sunt modi. Modi voluptatum consequatur voluptas voluptas. Consequatur distinctio numquam est nesciunt. Eaque odio consequuntur et vitae. Repudiandae voluptatem illum perferendis occaecati voluptatem quidem mollitia commodi. Iste architecto quaerat voluptatem. Deleniti porro nulla aut.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 2, NULL),
(33, 'Ut saepe quis dolores et. Consequuntur ducimus quidem ut eligendi quae quos nemo. Illum est aperiam. Dolorem et quisquam ut et autem nobis omnis illum voluptatem. Ducimus necessitatibus ex fugiat autem voluptates tempora deserunt. Eos aut ea sed et in consequuntur vel. Repudiandae autem ut sit magnam dolor aut qui repellat exercitationem. Aut quibusdam odit. Natus rerum vel voluptatem qui aut rerum delectus maxime. Iure accusamus ut.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 6, NULL),
(34, 'Hic recusandae officia temporibus voluptas. Et fuga ab necessitatibus necessitatibus numquam. Earum dolores vitae quas ratione. Quod voluptatem amet eos et ipsum in laborum. Ab qui molestias aut officia excepturi officia. Nostrum voluptas quia molestias voluptatibus nulla autem id hic. Ipsam earum dolor repudiandae sint eius quasi et. Vitae quas totam et reiciendis pariatur possimus accusantium sunt qui. Provident dignissimos necessitatibus magnam voluptas velit similique hic excepturi dignissimos. Eveniet molestiae commodi ut sunt est consequatur rerum nostrum. Cumque eos optio. Quam repudiandae cum distinctio dolorem nihil sequi quia architecto. Iure consequatur non voluptate veniam animi architecto.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 1, NULL),
(35, 'Molestiae enim omnis eum qui est. Ea vel distinctio repudiandae labore iusto repellendus delectus. Quasi ex occaecati voluptatibus ratione ullam rerum soluta similique. Vero explicabo sed explicabo ipsum. Dolore ut eos saepe est illo. Maxime voluptatum quod ut dolores natus dolor odio consequatur quis. Autem ut fuga eveniet et ullam non dolorem culpa. Assumenda tempora est id eveniet placeat aut. Quia eius placeat eos error. Facere voluptas minima.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 5, NULL),
(36, 'Ut dolor earum eum omnis officiis occaecati eligendi numquam. Officiis quia id. Corporis libero voluptatem nemo in iste tempore numquam quos aperiam. Exercitationem veritatis tempora. Omnis id suscipit libero consequuntur aut. Qui quis blanditiis asperiores quaerat corrupti mollitia odio. Nisi minus minima nisi expedita aut quis. Et ut ratione. Molestiae veniam ad quibusdam quod enim hic. Aspernatur dolorem ea est amet non. Sapiente repellendus ut molestiae debitis molestiae.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 1, NULL),
(37, 'Illo nihil quae est assumenda quo aut consequatur voluptas. Nesciunt ipsam et qui ex eveniet omnis. Sunt nesciunt rerum exercitationem non. Rerum deleniti labore vel non numquam. Illum ad quia omnis. Enim blanditiis assumenda et nulla quia sint voluptatem quia. Aliquid impedit incidunt facilis quis est. Ut velit non beatae quia sequi necessitatibus ipsum voluptatibus. Cupiditate eum cum voluptatibus adipisci debitis. Corrupti hic quam rem hic sint numquam consequatur mollitia. Similique sint et non.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 6, NULL),
(38, 'Soluta ut possimus. Consectetur sed doloribus. Accusamus alias asperiores natus. Sint iusto magni dignissimos sint et est mollitia. Est explicabo nam natus nulla aut qui nihil saepe exercitationem. Quisquam magni et atque omnis distinctio soluta et quis. Possimus quo saepe ipsum illo aspernatur rem. Voluptas maiores sunt soluta nihil ea. Accusantium expedita ut dolorem voluptatibus dolore adipisci voluptas. Ut sapiente excepturi rerum reprehenderit dolorem dolores nisi voluptatibus.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 1, NULL),
(39, 'Et et et temporibus. Quis sed exercitationem voluptatem amet eveniet reprehenderit. Assumenda animi ut dolores quis qui iure voluptas sed. Quasi vel facere. Odit veritatis aut vitae et tempore. Enim dolor atque ut sequi incidunt esse. Nisi quia optio voluptas voluptatem veniam deserunt. Unde fuga qui reiciendis. Numquam molestiae earum molestiae. Aut alias perspiciatis aut repellat molestias nulla. Non quia nisi ex ad.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 1, NULL),
(40, 'Vitae rem odit deleniti ut recusandae. Illum ipsa labore. Quisquam qui vitae et ullam optio atque labore nihil. Dolores magni aliquid omnis ullam. Est porro soluta et soluta voluptas repellendus omnis. Est sed ullam quas quibusdam a itaque autem ad adipisci. Ad voluptas magnam aut est provident ratione labore saepe. Earum sequi exercitationem. Officia porro iure doloribus aut corrupti excepturi est excepturi. Quaerat officia expedita ipsam sit dicta possimus velit porro. Culpa assumenda ipsum nam eum culpa dolorum eos esse commodi. Et voluptatem qui itaque saepe voluptates dolores qui. Odio quis exercitationem ipsum.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 6, NULL),
(41, 'Recusandae dolores quis. Praesentium libero officiis repellendus fugit. Sit dolores modi nulla. Ea quo dicta. Laudantium a eveniet minima sint adipisci veritatis illo earum. Illum consectetur ut voluptatem cupiditate aliquam animi delectus exercitationem consectetur. Dignissimos fuga consequatur laboriosam quibusdam veritatis quo molestiae voluptas. Blanditiis quisquam praesentium ratione quia voluptatem et. Sed eum provident ut maxime ut quam aliquid. Iste itaque est est dignissimos voluptates non in ipsa veritatis.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 3, NULL),
(42, 'Sint repellendus consequuntur. Esse blanditiis ab mollitia iure non ipsum nulla dolores praesentium. Sunt repellat molestiae. Nihil nesciunt tempore sit sit non a ut necessitatibus. Ea ut et necessitatibus minus ad minima et placeat molestiae. Sapiente reiciendis ut. Hic tenetur eius autem dolorem perspiciatis. Quia dolorum iure beatae temporibus. Culpa dolor reprehenderit perspiciatis accusamus. Est sint labore sed autem voluptatem molestiae dolor odio et. Unde est quaerat tenetur quia et voluptas est. Voluptas exercitationem dignissimos consequuntur vitae laborum.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 5, NULL),
(43, 'Corrupti magnam quis rerum maxime recusandae excepturi consequuntur. Quia odio repellat et nihil enim quo quasi. Corrupti quos ex. Ratione soluta libero autem voluptatibus est. Dolor voluptatem et suscipit numquam. Nihil excepturi illo sunt provident dolore. Ut corporis ducimus et molestiae voluptatem nesciunt dolorem atque velit. Necessitatibus similique sapiente sint nesciunt consequuntur minima nisi quasi qui. Debitis totam et quod aut cumque iste ipsa assumenda. Laborum eaque et repellendus. Et dolor aut necessitatibus.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 5, NULL),
(44, 'Aut quas molestias vero veritatis perspiciatis ut harum laudantium et. Illo commodi tempore vel quasi velit provident dicta similique sed. Enim provident aperiam non hic. Aut ipsum et eum sequi magnam rerum aut aut fugiat. Est illum saepe aperiam sit veniam ea cumque dolorum. Similique vel accusantium quis odio. Sed optio sunt delectus. Suscipit rerum a omnis natus rerum. Voluptatem tempora et eum. Aut et molestiae nobis eum.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 6, NULL),
(45, 'Architecto debitis dolores repellat vitae nam et odio corrupti. Doloribus quam inventore ut dignissimos quaerat veniam est. Aut dolores in quia exercitationem. Tempore qui ipsa eius libero qui rerum nesciunt voluptatum voluptatem. Eum sed sit occaecati iusto. Nobis quas ipsa blanditiis dolor quo. Sapiente harum officia facilis quos. Asperiores quae et. Commodi doloribus laborum ipsum. Eos consequuntur vel id dolorem incidunt. Optio aut et et eos suscipit quia veniam omnis.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 4, NULL),
(46, 'Eius ut voluptatem laboriosam. Aut et illum sit aut eligendi. Ut veniam ab maiores. Quo repudiandae distinctio. In fugiat ut beatae. Dolor aspernatur adipisci corrupti et. Molestiae ullam quasi ipsa rerum et nemo eos. Mollitia ut aut ullam velit assumenda itaque qui autem. Ad consequatur illo dicta quidem officia. Sit ipsum tempore quia aut totam nulla sint exercitationem. Deleniti tenetur ab aut.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 4, NULL),
(47, 'Quod mollitia fuga aut est est et. Velit aut ut fugit delectus quo. Unde sit repudiandae. Pariatur fugit fugiat ad laudantium est iure provident. Dolorem qui odit ut enim autem perspiciatis consequatur totam. Nihil quis aut ratione necessitatibus. Quam laborum sit iste blanditiis at. Voluptas voluptatibus voluptatibus officia sed quia est magni ut. Vitae officiis inventore vitae distinctio cum id fugiat earum. Maxime ab expedita et sed atque totam consectetur. Possimus ullam odit facilis. Quos ipsam quia nemo.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 4, NULL),
(48, 'Sed id non asperiores reprehenderit et. Quia quam incidunt sunt et nihil vero recusandae voluptate. Odio error fugit qui quia velit pariatur nemo. Molestiae expedita esse perspiciatis iure. Ut voluptas laborum voluptates itaque. Enim ut numquam reprehenderit perferendis in officiis et sint expedita. Porro vel enim expedita natus et minus rerum. Ut officiis sed in hic architecto facilis delectus et. Molestiae cum corporis tempore ipsam ab totam corporis perferendis et. Sed ut est. Aut quidem occaecati hic aperiam id totam rerum ut voluptatibus. Iusto repudiandae doloremque ea quia et. Facilis ratione nemo quos ab.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 3, NULL),
(49, 'Nobis labore recusandae delectus voluptatibus vero. Eos qui expedita repellendus delectus accusantium praesentium sed ullam quia. Necessitatibus tenetur quod ducimus perspiciatis praesentium deleniti et. Et possimus dicta soluta. Eos occaecati amet nam explicabo distinctio sed et voluptates. Quo quibusdam pariatur cumque enim explicabo. Placeat non laboriosam dolor provident veritatis dicta sunt sit eos. Iure autem sequi occaecati dolores laboriosam est magni voluptas. Ratione aut ea et enim maiores. Aut quasi minima laboriosam. Ut maiores quidem alias sunt aut et et voluptas.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 1, NULL),
(50, 'Eveniet fugit doloremque et corporis eos. Ut id corporis voluptatem molestiae dignissimos exercitationem laudantium cupiditate in. A et quos a dicta architecto iusto. Quisquam consectetur velit maxime quis ipsam. Quisquam quibusdam suscipit et minima unde. Eveniet sed vero facere sed tempore quidem laudantium accusantium. Voluptatum ut eum qui et ea. Voluptas dolorem ut quia laborum aut. Enim culpa incidunt ipsa ut consectetur corporis enim. Aut ducimus eos sequi perspiciatis eius totam labore veritatis. Enim voluptatem nulla.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 5, NULL),
(51, 'Voluptas hic molestias numquam hic. Voluptas veritatis modi sint itaque laborum sunt omnis officia. Omnis similique sit voluptate delectus. Voluptate blanditiis quisquam aut nihil qui. Nihil repudiandae optio id. Sed iure ut. Debitis inventore nulla. Quia sint magnam doloribus fugiat. Ut necessitatibus et eaque est rem sed eligendi. Sed eos neque exercitationem suscipit quaerat optio. Corrupti numquam eligendi dolores laboriosam et itaque labore numquam harum.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 3, NULL),
(52, 'Fugit voluptatem tempore aut. Consequatur sit accusamus delectus maxime et et eos autem eaque. Eaque assumenda aut reiciendis fugiat quasi ad et. Consequuntur autem ut. Quibusdam enim qui aut ex doloremque sunt eveniet nam. Nihil aperiam ea dolor magnam omnis. Repudiandae exercitationem numquam. Impedit est eum omnis distinctio eum ipsam qui explicabo neque. Consequatur sit fugiat et aperiam deserunt. Ipsam dolor voluptatibus. Dolores at accusantium. Expedita sunt nostrum sit et totam animi ut tempore. Sit perferendis doloremque.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 3, NULL),
(53, 'Temporibus ullam tenetur numquam asperiores consequuntur consequatur fugit aut. Aspernatur illum mollitia dolorem a id cupiditate placeat aspernatur sint. Ut rerum vel qui neque. Officia distinctio cumque eos officiis tempore aut. Nihil minima eos neque. Molestiae dicta harum. Id quia laborum repellat dicta et occaecati accusantium quasi eum. Aut non magni. Fuga sit inventore voluptas iste autem. Eligendi pariatur a rem amet consequatur facere mollitia. Enim rerum tenetur sint officia aut velit.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 3, NULL),
(54, 'Eveniet rerum adipisci quae quasi quibusdam vel vero. Qui deleniti molestias rem et. Quia alias voluptatibus qui quasi eos in. Cumque excepturi occaecati. A doloremque velit excepturi. Quia est sapiente voluptatem sed aut et occaecati non. Aliquam eius porro tenetur esse. Blanditiis ad praesentium et ipsa quisquam explicabo. Quam aut atque quasi quis qui. Reprehenderit nemo ipsum sint omnis corporis voluptatem itaque sed corporis. Ullam id sed repellat rerum quibusdam itaque vitae laboriosam.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 3, NULL),
(55, 'Sint iure similique assumenda laboriosam error nam. Quia aut voluptate officiis sed eum assumenda. Quam et corrupti commodi nostrum dolore iusto itaque rerum. Eveniet ullam neque aut error sint accusantium quidem. Omnis veniam quam ut. Cupiditate aut ab totam nihil minima. Et nobis sit. Alias eum non aliquam vitae soluta sed repellat sint. Corrupti perspiciatis distinctio fugit ut culpa sint facilis sed voluptatibus. Et soluta similique.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 1, NULL),
(56, 'Et illo qui tempore aut velit delectus itaque. Tempora sit quisquam pariatur esse repudiandae totam est. Rerum qui quo nulla repellat dolor sed qui dolore. Et perspiciatis aliquam facilis voluptatem voluptatibus aut voluptatem. Culpa repudiandae eum. Id quia voluptas nam itaque sit adipisci officia aperiam aut. Corrupti praesentium recusandae voluptas consequatur officiis consequatur iusto commodi molestias. Perspiciatis vitae qui fugit ipsa eos rem velit facere enim. Laboriosam voluptates voluptas blanditiis molestiae ex at. Soluta quam libero qui id quas et tempora. Corporis odit velit et quia dolorum et aut veritatis illum.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 3, NULL),
(57, 'Illum minima ullam ut molestiae veniam. Sapiente laborum magnam quia fugiat provident ratione repellat doloremque vel. Et placeat sunt iste dolor qui. Dolores quaerat atque ut reprehenderit aut accusantium iste odio facere. Voluptatem quia quibusdam cumque placeat architecto. Est beatae nihil dolores ipsum. Omnis veritatis reprehenderit molestiae aut expedita asperiores. Voluptatibus eveniet ut laudantium. Omnis autem et et nostrum iste. Perspiciatis corporis non qui laudantium est. Enim at minima esse harum laudantium et laboriosam.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 2, NULL),
(58, 'Corrupti qui eaque incidunt et ad. Ratione minus nobis sint minus accusamus. Labore corporis minima praesentium sed. Dolore at iusto ullam sint laboriosam. Dolore quod blanditiis nostrum non ipsa delectus temporibus beatae laborum. Iste natus autem ipsa doloribus fugiat vel enim et fugiat. Molestias doloremque quaerat eum eveniet officiis quam aperiam rem facilis. Veniam magnam modi sint veniam neque quia expedita est. Ut ducimus aut sit harum fuga consequuntur. In sint iure ipsum. Fuga voluptas est nisi.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4, 1, NULL),
(59, 'Fugiat commodi non ipsa quas. Voluptatum quia eos esse unde. Voluptas deserunt molestias. Est eum deleniti temporibus quod nam deserunt. Officiis quam qui totam quis quo ipsum aliquid. Minus aut molestiae perspiciatis esse suscipit rerum eos possimus. Consequatur velit autem corrupti blanditiis. Officiis velit quaerat voluptas. Numquam aut exercitationem et vel deserunt corrupti aut voluptates officia. Ea praesentium est quaerat quaerat eveniet voluptates. Velit fugit accusantium. Nesciunt et fugiat ea eos. Qui voluptatibus nobis qui suscipit omnis.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 6, NULL),
(60, 'Similique amet facilis nihil aut est natus. Eaque explicabo sequi molestiae eum. Quam et et quia quidem rem iusto et. Et aperiam omnis. Beatae minus debitis sunt voluptas. Qui aut aspernatur reiciendis libero cumque excepturi alias quos totam. Consequatur a et possimus occaecati. Sed non doloribus accusamus voluptas voluptatem aut deserunt. Voluptas exercitationem commodi quia voluptatum sunt vero. Sunt ratione aliquid ab nesciunt aut culpa itaque alias aut. Nisi et sit et tempora temporibus optio suscipit aut.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 2, NULL),
(61, 'Qui eligendi eos atque aut explicabo aliquid incidunt eum provident. Autem in voluptatum dolores harum ut quia. Nihil amet voluptatum dolores molestias id molestias eligendi expedita. Vitae vel quas atque assumenda. Et autem voluptates itaque iste perspiciatis ipsa. Qui est repudiandae voluptatibus laboriosam quia. Placeat deleniti maxime reprehenderit cupiditate eum quas labore pariatur. Veritatis ea assumenda aut possimus consectetur voluptate dolores hic molestiae. Quaerat ut quisquam. Et voluptatum iste. Rerum qui occaecati quos. Doloribus laudantium est magni non voluptates velit.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 1, NULL),
(62, 'Et recusandae deserunt. Dolorum quia dolores tenetur est aperiam qui temporibus animi. Sapiente velit recusandae molestiae ea dolor libero eum. Laborum neque aperiam quia. Consequatur vel non cum eum distinctio sunt est molestiae fugiat. Excepturi in voluptas velit omnis animi. Laudantium ducimus incidunt amet accusamus suscipit voluptates. Ducimus iste vitae inventore tempore numquam quis molestiae. Corporis nihil voluptas ut debitis. Dolor minus est. Deserunt minus expedita.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3, 4, NULL),
(63, 'Harum magnam distinctio voluptatum laboriosam. Reprehenderit aut distinctio facere. Non dolores veniam cupiditate facilis et nemo. Aut repellendus eos qui sunt. Quis corporis vero id animi molestias perspiciatis dolorum quae. Ex deleniti voluptas quis similique voluptate alias error reiciendis non. Omnis quod quam sed voluptas. Et nemo unde numquam autem veniam. Aut voluptas sint nulla adipisci. Sed recusandae fugiat voluptas quia. Velit accusamus voluptatem. Non quo dolores labore fugit voluptatum.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 2, NULL),
(64, 'Id suscipit magnam tenetur. Sequi non modi voluptatem natus odio dicta ab soluta tenetur. Quia velit quis distinctio. Alias velit aut cupiditate est omnis. Et fugit eum et consequatur est qui nihil error accusamus. Esse libero ratione aspernatur repellat dolores. Dolor enim aut consequatur debitis rerum quas. Dolorem at similique facilis facilis neque rerum dolor perferendis. Qui hic fugiat amet vero aliquam quis unde dignissimos maiores. Adipisci cum repellat illum asperiores. Rerum illo aperiam facilis. Ea voluptas saepe magni quidem consequatur itaque recusandae temporibus dolores.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1, 1, NULL),
(65, 'Aspernatur velit et. Porro reprehenderit et non itaque magni ab. Et quas est omnis. Doloribus magni illo nisi odit. Omnis unde non voluptas molestiae ut enim suscipit. Dicta distinctio aut dolorem occaecati est. Sit accusamus laboriosam iure illum voluptate et voluptatem. Qui quo dolorum modi non sunt qui. Assumenda est quae sequi nostrum. Et cumque sapiente.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 1, NULL),
(66, 'Quos et et sed eos. Sit provident tempora velit sed qui delectus qui repudiandae. Aut rem mollitia sint ut et ut. Aspernatur id in rerum sed cupiditate molestias aperiam debitis quia. Quis quisquam explicabo. In incidunt sint commodi aperiam. Adipisci officiis voluptatem hic quo. Consectetur rerum tempora et. Culpa et eaque est repellendus architecto sint tempora. Nesciunt aliquid est ut provident natus. Voluptas est hic quo aut possimus placeat et dolor consequuntur. Vel accusantium et amet dolores est tempore quam qui est. Ipsam dolore occaecati possimus illum.', 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2, 1, NULL),
(67, 'Hiện tại mình nên chọn môn CO3041 không nhỉ?', 0, '2019-05-22 11:35:14', '2019-05-22 11:35:14', 2, 7, 7),
(68, '[quote author_id=[object Object] name=\"Jim Tran\" parent_id=7 post_id=67]Hiện tại mình nên chọn môn CO3041 không nhỉ?[/quote]\n\nCó :)', 0, '2019-05-22 11:35:33', '2019-05-22 11:35:33', 2, 7, NULL),
(69, 'blablaaaa', 0, '2019-05-22 11:38:16', '2019-05-22 11:38:16', 2, 7, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `post_votes`
--

CREATE TABLE `post_votes` (
  `voted` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `content` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `response` enum('resolved','open') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reported_by` int(11) DEFAULT NULL,
  `thread_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Rooms`
--

CREATE TABLE `Rooms` (
  `room_id` int(11) NOT NULL,
  `status` smallint(6) DEFAULT '0',
  `user_one_id` int(11) DEFAULT NULL,
  `user_two_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `Rooms`
--

INSERT INTO `Rooms` (`room_id`, `status`, `user_one_id`, `user_two_id`) VALUES
(1, 1, 1, 2),
(2, 1, 1, 3),
(3, 1, 1, 4),
(4, 1, 1, 5),
(5, 1, 2, 3),
(6, 1, 2, 5),
(14, 1, 4, 2),
(15, 1, 13, 2),
(16, 1, 2, 2),
(17, 1, 8, 2);

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `thread_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Threads`
--

CREATE TABLE `Threads` (
  `thread_id` int(11) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `score` int(11) NOT NULL DEFAULT '0',
  `favorites` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `author_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `Threads`
--

INSERT INTO `Threads` (`thread_id`, `title`, `score`, `favorites`, `createdAt`, `updatedAt`, `author_id`) VALUES
(1, 'Debitis temporibus eligendi qui.', 3, 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2),
(2, 'Ea sit eos doloremque ipsum.', -3, 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1),
(3, 'Eveniet enim soluta illo porro voluptatem saepe ducimus omnis rem.', -4, 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 1),
(4, 'Libero est voluptatibus placeat et porro aut.', -2, 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 2),
(5, 'Optio sed et.', -3, 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 4),
(6, 'Dolorem voluptas cum assumenda fuga ut aliquam.', -1, 0, '2019-05-19 13:59:43', '2019-05-19 13:59:43', 3),
(7, 'Cần một lời giải đáp', 0, 0, '2019-05-22 11:35:14', '2019-05-22 11:35:14', 2);

-- --------------------------------------------------------

--
-- Table structure for table `thread_topics`
--

CREATE TABLE `thread_topics` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `thread_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thread_votes`
--

CREATE TABLE `thread_votes` (
  `voted` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `thread_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Topics`
--

CREATE TABLE `Topics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `Topics`
--

INSERT INTO `Topics` (`id`, `name`, `title`, `desc`, `createdAt`, `updatedAt`) VALUES
(1, 'officiis-eum', 'officiis eum', 'Eos quia repellendus voluptates qui aliquam.', '2019-05-19 13:59:43', '2019-05-19 13:59:43'),
(2, 'accusantium', 'accusantium', 'Quia qui voluptas voluptate natus sunt.', '2019-05-19 13:59:43', '2019-05-19 13:59:43'),
(3, 'voluptatum-cumque', 'voluptatum cumque', 'Fugiat ut et officiis in maiores impedit.', '2019-05-19 13:59:43', '2019-05-19 13:59:43'),
(4, 'magnam', 'magnam', 'Enim quaerat accusamus ut ut repudiandae consequatur quia.', '2019-05-19 13:59:43', '2019-05-19 13:59:43'),
(5, 'veritatis-est', 'veritatis est', 'Ipsam in facere velit nemo sequi nostrum molestias.', '2019-05-19 13:59:43', '2019-05-19 13:59:43'),
(6, 'libero-dicta', 'libero dicta', 'Sit ut possimus iusto rem et.', '2019-05-19 13:59:43', '2019-05-19 13:59:43'),
(7, 'porro', 'porro', 'Blanditiis voluptates est minima hic magni ea asperiores quas pariatur.', '2019-05-19 13:59:43', '2019-05-19 13:59:43'),
(8, 'autem-et-et', 'autem et et', 'Aut ab minus saepe qui praesentium et quia perferendis.', '2019-05-19 13:59:43', '2019-05-19 13:59:43'),
(9, 'eos-et', 'eos et', 'Quae rerum nam temporibus dolorum totam adipisci.', '2019-05-19 13:59:43', '2019-05-19 13:59:43'),
(10, 'earum-quia-ad', 'earum quia ad', 'Culpa placeat repellendus dicta et illo.', '2019-05-19 13:59:43', '2019-05-19 13:59:43');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `about` varchar(120) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` enum('user','admin') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'user',
  `first_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `dept` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `year` smallint(6) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`user_id`, `username`, `email`, `password`, `about`, `role`, `first_name`, `last_name`, `avatar`, `cover`, `dept`, `year`, `createdAt`, `updatedAt`) VALUES
(1, 'longkh', 'kimhoanglong.cs@gmail.com', '$2b$10$KIw13MkcsT552h/xrsuS2eXMipcdGKzZXrQm7qkAEUz.h6rEomn2.', 'I\'m Gosu, I\'m THE worst', 'user', 'Long', 'KimHoang', '/images/avatars/avatar_long.jpg', 'http://thewowstyle.com/wp-content/uploads/2015/01/cover-facebook-1.jpg', 'Computer Science', 2016, '2019-05-19 13:59:42', '2019-06-04 17:18:54'),
(2, 'jimcbl', 'jimcbl@gmail.com', '$2b$10$5ykq0Pl3EGVMtNu./B8Z5.vLsFjzX7OJBMj4LIBsfCBD/9SFUi7/.', 'Hey there I\'m Jim, I love Apple', 'user', 'Jim', 'Tran', '/images/avatars/avatar_jim.jpg', 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=1080', 'Computer Science', 2016, '2019-05-19 13:59:42', '2019-06-03 10:54:22'),
(3, 'sarah123', 'sarah@gmail.com', '$2b$10$5ykq0Pl3EGVMtNu./B8Z5.vLsFjzX7OJBMj4LIBsfCBD/9SFUi7/.', 'I rather not say anything', 'user', 'Sarah', 'Vo', '/images/avatars/avatar_nhu.jpg', 'https://img.wallpapersafari.com/desktop/1680/1050/87/94/BuaEIn.jpg', 'Computer Science', 2016, '2019-05-19 13:59:42', '2019-05-19 13:59:42'),
(4, 'anng96', 'anng96@gmail.com', '$2b$10$5ykq0Pl3EGVMtNu./B8Z5.vLsFjzX7OJBMj4LIBsfCBD/9SFUi7/.', NULL, 'admin', 'An', 'Nguyen', '/images/avatars/avatar_an.jpg', 'http://thewowstyle.com/wp-content/uploads/2015/01/Facebook-Cover-With-Funny-Quotes-8.jpg', 'Computer Science', 2016, '2019-05-19 13:59:42', '2019-05-19 13:59:42'),
(5, 'abc1', 'abc1@gmail.com', '$2b$10$5ykq0Pl3EGVMtNu./B8Z5.vLsFjzX7OJBMj4LIBsfCBD/9SFUi7/.', NULL, 'user', 'Thuy', 'Tam', 'https://images.unsplash.com/photo-1554457945-ba5df6648602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80', 'https://images.unsplash.com/photo-1557163123-abbafe113238?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80', 'Civil', 2015, '2019-05-19 13:59:42', '2019-05-19 13:59:42'),
(6, 'abc2', 'abc2@gmail.com', '$2b$10$5ykq0Pl3EGVMtNu./B8Z5.vLsFjzX7OJBMj4LIBsfCBD/9SFUi7/.', NULL, 'user', 'Ky', 'An', 'https://images.unsplash.com/photo-1554457945-ba5df6648602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80', 'https://images.unsplash.com/photo-1557163123-abbafe113238?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80', 'Food', 2017, '2019-05-19 13:59:42', '2019-05-19 13:59:42'),
(7, 'abc3', 'abc3@gmail.com', '$2b$10$5ykq0Pl3EGVMtNu./B8Z5.vLsFjzX7OJBMj4LIBsfCBD/9SFUi7/.', NULL, 'user', 'John', 'Wick', 'https://images.unsplash.com/photo-1554457945-ba5df6648602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80', 'https://images.unsplash.com/photo-1557163123-abbafe113238?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80', 'SIM', 2018, '2019-05-19 13:59:42', '2019-05-19 13:59:42'),
(8, 'abc4', 'abc4@gmail.com', '$2b$10$5ykq0Pl3EGVMtNu./B8Z5.vLsFjzX7OJBMj4LIBsfCBD/9SFUi7/.', NULL, 'user', 'Adam', 'Levine', 'https://images.unsplash.com/photo-1554457945-ba5df6648602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80', 'https://images.unsplash.com/photo-1557163123-abbafe113238?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80', 'EEE', 2019, '2019-05-19 13:59:42', '2019-05-19 13:59:42'),
(9, 'abc5', 'abc5@gmail.com', '$2b$10$5ykq0Pl3EGVMtNu./B8Z5.vLsFjzX7OJBMj4LIBsfCBD/9SFUi7/.', NULL, 'user', 'Christ', 'Pratt', 'https://images.unsplash.com/photo-1554457945-ba5df6648602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80', 'https://images.unsplash.com/photo-1557163123-abbafe113238?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80', 'Environment', 2015, '2019-05-19 13:59:42', '2019-05-19 13:59:42'),
(12, 'longkh2', 'long.kim@dki-sd.com', '$2b$10$HJKGDNtkkaVX2nTSOg9lh.PWjVylCdKmKih.4yvP9g6sG1yH0sziW', '', 'user', 'Long', 'Kim', NULL, 'https://images.unsplash.com/photo-1556909172-89cf0b24ff02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80', NULL, 0, '2019-05-27 13:16:44', '2019-05-27 13:53:22'),
(13, 'longkh3', 'long.kim2@dki-sd.com', '', '', 'user', 'Long', 'Kim', 'https://image.anninhthudo.vn/w700/uploaded/85/2019_05_20/32.jpg', 'https://images.unsplash.com/photo-1556909172-89cf0b24ff02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80', NULL, 1, '2019-06-02 12:01:50', '2019-06-02 12:14:37'),
(14, 'minhngon1520', 'minhngon1520@gmail.com', '$2b$10$MHOD5TC7zLmAyQCnO5IgXuirxwCUmHr3eAXFFQuCyMVeYJ77.oDOC', NULL, 'user', NULL, NULL, 'https://www.facebook.com/photo.php?fbid=1789470041349418&set=a.1383087098654383&type=3&theater', NULL, NULL, NULL, '2019-06-02 12:17:39', '2019-06-02 12:19:11'),
(15, 'quandxbp', 'quandxbp@gmail.com', '$2b$10$Hr.BHY.ysFFKi/dTuIiKi.NoxvNqcVYPavmvL9x2q3x5vhpIx5.Ha', NULL, 'user', NULL, NULL, NULL, NULL, NULL, NULL, '2019-06-03 02:56:34', '2019-06-03 02:56:34');

-- --------------------------------------------------------

--
-- Table structure for table `user_rooms`
--

CREATE TABLE `user_rooms` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `room_id` int(11) NOT NULL,
  `RoomRoomId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Friends`
--
ALTER TABLE `Friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_one_id` (`user_one_id`),
  ADD KEY `user_two_id` (`user_two_id`),
  ADD KEY `action_user_id` (`action_user_id`);

--
-- Indexes for table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `posted_by` (`posted_by`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `content_of` (`content_of`);

--
-- Indexes for table `post_votes`
--
ALTER TABLE `post_votes`
  ADD PRIMARY KEY (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `reported_by` (`reported_by`),
  ADD KEY `thread_id` (`thread_id`);

--
-- Indexes for table `Rooms`
--
ALTER TABLE `Rooms`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `user_one_id` (`user_one_id`),
  ADD KEY `user_two_id` (`user_two_id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`thread_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Threads`
--
ALTER TABLE `Threads`
  ADD PRIMARY KEY (`thread_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `thread_topics`
--
ALTER TABLE `thread_topics`
  ADD PRIMARY KEY (`thread_id`,`topic_id`),
  ADD KEY `topic_id` (`topic_id`);

--
-- Indexes for table `thread_votes`
--
ALTER TABLE `thread_votes`
  ADD PRIMARY KEY (`thread_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Topics`
--
ALTER TABLE `Topics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_rooms`
--
ALTER TABLE `user_rooms`
  ADD PRIMARY KEY (`room_id`,`RoomRoomId`),
  ADD KEY `RoomRoomId` (`RoomRoomId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Friends`
--
ALTER TABLE `Friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Rooms`
--
ALTER TABLE `Rooms`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `Threads`
--
ALTER TABLE `Threads`
  MODIFY `thread_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Topics`
--
ALTER TABLE `Topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Friends`
--
ALTER TABLE `Friends`
  ADD CONSTRAINT `Friends_ibfk_1` FOREIGN KEY (`user_one_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Friends_ibfk_2` FOREIGN KEY (`user_two_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Friends_ibfk_3` FOREIGN KEY (`action_user_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Posts`
--
ALTER TABLE `Posts`
  ADD CONSTRAINT `Posts_ibfk_1` FOREIGN KEY (`posted_by`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Posts_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `Threads` (`thread_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Posts_ibfk_3` FOREIGN KEY (`content_of`) REFERENCES `Threads` (`thread_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `post_votes`
--
ALTER TABLE `post_votes`
  ADD CONSTRAINT `post_votes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_votes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`reported_by`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`thread_id`) REFERENCES `Threads` (`thread_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Rooms`
--
ALTER TABLE `Rooms`
  ADD CONSTRAINT `Rooms_ibfk_1` FOREIGN KEY (`user_one_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Rooms_ibfk_2` FOREIGN KEY (`user_two_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `Threads` (`thread_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Threads`
--
ALTER TABLE `Threads`
  ADD CONSTRAINT `Threads_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `thread_topics`
--
ALTER TABLE `thread_topics`
  ADD CONSTRAINT `thread_topics_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `Threads` (`thread_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `thread_topics_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `Topics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thread_votes`
--
ALTER TABLE `thread_votes`
  ADD CONSTRAINT `thread_votes_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `Threads` (`thread_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `thread_votes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_rooms`
--
ALTER TABLE `user_rooms`
  ADD CONSTRAINT `user_rooms_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_rooms_ibfk_2` FOREIGN KEY (`RoomRoomId`) REFERENCES `Rooms` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
