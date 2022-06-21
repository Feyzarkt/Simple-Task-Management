USE [TaskManagementdb]
GO
/****** Object:  Schema [COMMON]    Script Date: 21.06.2022 14:55:17 ******/
CREATE SCHEMA [COMMON]
GO
/****** Object:  Schema [CONTENT MANAGEMENT]    Script Date: 21.06.2022 14:55:17 ******/
CREATE SCHEMA [CONTENT MANAGEMENT]
GO
/****** Object:  Table [COMMON].[User]    Script Date: 21.06.2022 14:55:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [COMMON].[User](
	[UserId] [uniqueidentifier] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Password] [varchar](50) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [CONTENT MANAGEMENT].[Board]    Script Date: 21.06.2022 14:55:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CONTENT MANAGEMENT].[Board](
	[BoardId] [uniqueidentifier] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[OwnerId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Board] PRIMARY KEY CLUSTERED 
(
	[BoardId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [CONTENT MANAGEMENT].[Card]    Script Date: 21.06.2022 14:55:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CONTENT MANAGEMENT].[Card](
	[CardId] [uniqueidentifier] NOT NULL,
	[Title] [varchar](50) NOT NULL,
	[Description] [varchar](450) NOT NULL,
	[BoardId] [uniqueidentifier] NOT NULL,
	[Deadline] [datetime] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
 CONSTRAINT [PK_Card] PRIMARY KEY CLUSTERED 
(
	[CardId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [COMMON].[User] ([UserId], [Name], [Email], [Password]) VALUES (N'b418ea3f-4835-4a87-be14-1c99dc3b291e', N'Feyza', N'feyzaurkut1@gmail.com', N'123456')
INSERT [COMMON].[User] ([UserId], [Name], [Email], [Password]) VALUES (N'b418ea3f-4835-4a87-be14-1c99dc3b291f', N'Hümeyra', N'humeyra@gmail.com', N'123456')
INSERT [COMMON].[User] ([UserId], [Name], [Email], [Password]) VALUES (N'c0b4264a-866b-4ec5-a1ab-70585ff2f7c4', N'Berna', N'berna@gmail.com', N'123456')
INSERT [COMMON].[User] ([UserId], [Name], [Email], [Password]) VALUES (N'c0b4264a-866b-4ec5-a1ab-70585ff2f7cc', N'Sümeyra', N'sumeyra@gmail.com', N'123456')
GO
INSERT [CONTENT MANAGEMENT].[Board] ([BoardId], [Name], [OwnerId]) VALUES (N'fe7dabb3-014f-4c5b-a14d-0a9da9e981e8', N'Shop List', N'c0b4264a-866b-4ec5-a1ab-70585ff2f7cc')
INSERT [CONTENT MANAGEMENT].[Board] ([BoardId], [Name], [OwnerId]) VALUES (N'bde23d9e-9999-4f11-a26d-777a2a42ff07', N'Vacation', N'b418ea3f-4835-4a87-be14-1c99dc3b291e')
INSERT [CONTENT MANAGEMENT].[Board] ([BoardId], [Name], [OwnerId]) VALUES (N'4e443209-ef19-4529-9e2b-9cef1452562a', N'Shop List', N'b418ea3f-4835-4a87-be14-1c99dc3b291e')
INSERT [CONTENT MANAGEMENT].[Board] ([BoardId], [Name], [OwnerId]) VALUES (N'37dfbc22-e18b-41c5-ab82-bd565ebe1ae1', N'Medication List', N'c0b4264a-866b-4ec5-a1ab-70585ff2f7cc')
GO
INSERT [CONTENT MANAGEMENT].[Card] ([CardId], [Title], [Description], [BoardId], [Deadline], [CreatedAt]) VALUES (N'9ad48113-aba0-493a-b862-0422f12cfe60', N'Vacation List', N'Package, Buy ticket, Müsli', N'bde23d9e-9999-4f11-a26d-777a2a42ff07', CAST(N'2022-08-24T00:00:00.000' AS DateTime), CAST(N'2022-06-21T14:47:33.283' AS DateTime))
INSERT [CONTENT MANAGEMENT].[Card] ([CardId], [Title], [Description], [BoardId], [Deadline], [CreatedAt]) VALUES (N'42978c29-63c5-432c-9c6c-1dfd2395354b', N'Tomato', N'1 kg', N'fe7dabb3-014f-4c5b-a14d-0a9da9e981e8', CAST(N'2022-06-27T00:00:00.000' AS DateTime), CAST(N'2022-06-21T12:51:30.893' AS DateTime))
INSERT [CONTENT MANAGEMENT].[Card] ([CardId], [Title], [Description], [BoardId], [Deadline], [CreatedAt]) VALUES (N'aabac09b-843a-48b7-94ea-685b687c954c', N'Vegetable', N'Tomato - 1kg, Cucumber - 0.5kg', N'4e443209-ef19-4529-9e2b-9cef1452562a', CAST(N'2022-06-25T00:00:00.000' AS DateTime), CAST(N'2022-06-21T14:45:05.503' AS DateTime))
INSERT [CONTENT MANAGEMENT].[Card] ([CardId], [Title], [Description], [BoardId], [Deadline], [CreatedAt]) VALUES (N'3401f708-022a-4678-9b70-94aec4990f33', N'Medication', N'Parol, Arveles, Stilex', N'37dfbc22-e18b-41c5-ab82-bd565ebe1ae1', CAST(N'2022-09-03T00:00:00.000' AS DateTime), CAST(N'2022-06-21T14:49:22.833' AS DateTime))
INSERT [CONTENT MANAGEMENT].[Card] ([CardId], [Title], [Description], [BoardId], [Deadline], [CreatedAt]) VALUES (N'53935b70-308f-4f9f-be40-c492700e9a4c', N'Others', N'Rice - 1kg', N'4e443209-ef19-4529-9e2b-9cef1452562a', CAST(N'2022-06-24T00:00:00.000' AS DateTime), CAST(N'2022-06-21T14:45:36.250' AS DateTime))
GO
ALTER TABLE [CONTENT MANAGEMENT].[Board]  WITH CHECK ADD  CONSTRAINT [FK_Board_User] FOREIGN KEY([OwnerId])
REFERENCES [COMMON].[User] ([UserId])
GO
ALTER TABLE [CONTENT MANAGEMENT].[Board] CHECK CONSTRAINT [FK_Board_User]
GO
ALTER TABLE [CONTENT MANAGEMENT].[Card]  WITH CHECK ADD  CONSTRAINT [FK_Card_Board] FOREIGN KEY([BoardId])
REFERENCES [CONTENT MANAGEMENT].[Board] ([BoardId])
GO
ALTER TABLE [CONTENT MANAGEMENT].[Card] CHECK CONSTRAINT [FK_Card_Board]
GO
