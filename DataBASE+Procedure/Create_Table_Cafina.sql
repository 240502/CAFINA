create database Cafina
use Cafina



Create Table Category(
	id int identity primary key,
	CateName nvarchar(50)
)
Alter table CategoryDetails
ADD CateId int foreign key references Category(id)

cREATE TABLE [Role](
	id int identity primary key,
	RoName nvarchar(50) not null
)

Create table Users(
	id int identity primary key,
	FullName nvarchar(100),
	email varchar(100),
	Phone_Number varchar(20),
	BirthDay date,
	Gender nvarchar(10) check(Gender in('nam',N'nữ')),
	Role_Id int foreign key references [Role] (id)
	on delete cascade on update cascade
)
Create table Account(
	id int identity primary key,
	UserName varchar(100) not null,
	[Password] varchar(200) not null,
	[User_id] int foreign key references Users(id)
	on delete cascade on update cascade, 
	Role_Id int foreign key references [Role] (id)
	on delete cascade on update cascade
)
Create table Product(
	ProductId varchar(100) primary key,
	title nvarchar(100) not null,
	price int not null,
	discount int,
	[description] nvarchar(100),
	ChatLieu nvarchar(50),
	HuongDanSuDung nvarchar(200),
	size varchar(10),
	color varchar(10)
)

Create table ProductViews
(
	id int identity primary key,
	ProductId varchar(100) foreign key references Product(ProductId)
	on delete cascade on update cascade,
	[count] int not null,
	
)
Alter table ProductViews add dateView date

alter table Product
add  CateDt int  foreign key references CategoryDetails(id)
on delete cascade on update cascade


create table Galery(
	id int identity primary key,
	ProductId varchar(100) foreign key references Product(ProductId)
	on delete cascade on update cascade,
	thumbnail varchar(200)
)
create table [Status]
(
	id int identity primary key,
	statusName nvarchar(100) not null
)
alter table [Order]
add [status] int foreign key references [Status] on delete cascade on update cascade
create table [Order](
	id int identity primary key,
	[user_id] int foreign key references Users(id)
	on update cascade on delete cascade,
	fullName nvarchar(50),
	email varchar(50),
	phone_number varchar(20),
	[address] nvarchar(100),
	note nvarchar(200),
	order_date date,
	[status] int
)
create table Order_Details(
	id int identity primary key,
	OrderId int foreign key references [Order](id)
	on delete cascade on update cascade,
	ProductId varchar(100) foreign key references Product(ProductId)
	on update cascade on delete cascade,
	Price int,
	Amount int
)

Create table BoSuTap(
	id int identity primary key,
	TenBST  nvarchar(100) not null
)
drop table Directory
Create table [Object](
	id  int identity primary key,
	TenDoiTuong nvarchar(50) not null
)
alter table Product
add [Object_id] int foreign key references [Object]
	on update cascade on delete cascade
alter table Product
add Bst_id int foreign key references BoSuTap
	on update cascade on delete cascade
