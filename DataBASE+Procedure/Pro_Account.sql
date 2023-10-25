Use Cafina
Create Proc Pro_Login
	@usName varchar(100),
	@pw varchar(200)
As
	Begin
		Select * From Account
		Where UserName = @usName and [Password] = @pw
	End
exec Pro_Login'sanghip200@gmail.com','123456'