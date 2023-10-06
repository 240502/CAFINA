
use cafina


Create Procedure Pro_Get_User_By_Id
	@id int
as
	Begin
		If(Not Exists (Select * From Users Where id = @id ))
		Begin
			Return -1
		End
		Else 
		Begin
			Select * From Users 
			Where id = @id
		End
	End

Create Procedure Pro_Search_Us
	@FullName nvarchar(100),
	@Email varchar(100),
	@PhoneNumber varchar(20)
as
	Begin
		If(Not Exists (
			Select * From Users 
			Where (@FullName = '' Or FullName Like N'%'+@FullName+'%') And
				(@Email = '' Or email = @Email) And
				(@PhoneNumber = '' Or Phone_Number = @PhoneNumber)
		))
		Begin
			Return -1
		End
		Else
		Begin
			Select * From Users 
			Where (@FullName = '' Or FullName Like N'%'+@FullName+'%') And
				(@Email = '' Or email = @Email) And
				(@PhoneNumber = '' Or Phone_Number = @PhoneNumber)
		End
	End

alter procedure Pro_ThongKe_User
	@fr_date datetime,
	@to_date datetime
as 
	begin
		select top 5 u.id,u.FullName,u.email,u.Phone_Number,u.BirthDay,u.Gender,u.Role_Id, SUM(od.Amount*od.Price)  as [Tổng tiền mua]
		from Users u inner join  [Order] o on u.id = o.[user_id] inner join  Order_Details od on o.id = od.OrderId
		where (@fr_date is null and @to_date is null) 
			or (@fr_date is not null and @to_date is null and o.order_date >= @fr_date) 
			or(@fr_date is null and @to_date is not null and o.order_date <=@to_date)
			or(o.order_date between @fr_date and @to_date)
		group by  u.id,u.FullName,u.email,u.Phone_Number,u.BirthDay,u.Gender,u.Role_Id
		order by  [Tổng tiền mua] desc 
	end

alter Procedure Pro_Login
	@email varchar(100),
	@PassWord varchar(50)

as
	begin
		select * from Users
		where email =@email and [PassWord] = @PassWord
	end

exec Pro_Login 'sanghip200@gmail.com','123456'
select * from Users



alter Procedure Pro_Create_User
	@FullName nvarchar(100),
	@email varchar(100),
	@Phone_Number varchar(20),
	@BirthDay date,
	@Gender nvarchar(10),
	@Role_Id int,
	@PassWord varchar(50)


as
	begin
		if(exists (select * from Users where email = @email))
		begin
			return -1 
		end
		eLSE
		Begin
			Insert into Users(FulLName,email,Phone_Number,BirthDay,Gender,Role_Id,[PassWord])
			values (@FullName,@email,@Phone_Number,@BirthDay,@Gender,@Role_Id,@PassWord)
		End
		
	end
select * from Users

Create Procedure Pro_Delete_User
	@User_id int
as
	Begin
		Delete Users
		Where id  = @User_id
	End

alter Procedure Pro_Update_User
	@User_id int,
	@FullName nvarchar(100),
	@email varchar(100),
	@Phone_Number varchar(20),
	@BirthDay datetime,
	@Gender nvarchar(10),
	@Role_Id int,
	@PassWord varchar(50)
as
	Begin
		Update Users
		Set FullName = @FullName,
			email = @email,
			Phone_Number = @Phone_Number,
			BirthDay = @BirthDay,
			Gender = @Gender,
			Role_Id = @Role_Id,
			[PassWord] = @PassWord
		Where id = @User_id
	End





