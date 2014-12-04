

1)
For git repository for this project go to:
https://github.com/miticv/OwinAngularBoilerplate

2)
Microsoft SQL Server Data Tools - Business Intelligence for Visual Studio 2013:
http://www.microsoft.com/en-us/download/confirmation.aspx?id=42313

3)
For running test cases:
  a)you can use api to gegister user:
  Create user:  username = "miticv@gmail.com", password = "Test!234"

  b) manualy in the sql tables you have to do create admin role and add this user it.
  (since api will not allow non-admin users to create roles)
  Create role: "Admin"
  Add above user to Admin role!!!

  c) Also add role: "Test" it is used for testing


  4) Add Refresh Token Tables:
  -------------------------------
  USE [identity]
GO

/****** Object:  Table [dbo].[Client]    Script Date: 12/1/2014 2:07:09 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Clients](
	[Id] [nvarchar](50) NOT NULL,
	[Secret] [nvarchar](256) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[ApplicationType] [int] NULL,
	[Active] [bit] NULL,
	[RefreshTokenLifeTime] [int] NULL,
	[AllowedOrigin] [nvarchar](100) NULL,
 CONSTRAINT [PK_Client] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[RefreshTokens](
	[Id] [nvarchar](50) NOT NULL,
	[Subject] [nvarchar](50) NOT NULL,
	[ClientId] [nvarchar](50) NOT NULL,
	[IssuedUtc] [datetime] NOT NULL,
	[ExpiresUtc] [datetime] NOT NULL,
	[ProtectedTicket] [varchar](MAX) NOT NULL,
 CONSTRAINT [PK_RefreshToken] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

  -------------------------------