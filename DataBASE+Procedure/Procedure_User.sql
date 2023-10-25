
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

select * from Users
alter procedure Pro_ThongKe_User
	@fr_date datetime,
	@to_date datetime
as 
	begin
		select top 5 u.id,u.FullName,u.email,u.Phone_Number,u.BirthDay,u.Address,SUM(od.Amount*od.Price)  as [Tổng tiền mua]
		from Users u inner join  [Order] o on u.id = o.[user_id] inner join  Order_Details od on o.id = od.OrderId
		where (@fr_date is null and @to_date is null) 
			or (@fr_date is not null and @to_date is null and o.order_date >= @fr_date) 
			or(@fr_date is null and @to_date is not null and o.order_date <=@to_date)
			or(o.order_date between @fr_date and @to_date)
		group by  u.id,u.FullName,u.email,u.Phone_Number,u.BirthDay,u.Gender,u.Address
		order by  [Tổng tiền mua] desc 
	end

select * from Users


exec Pro_Create_User 'a','2@gmail.com','333','2002-01-01','Nam','string'
alter Procedure Pro_Create_User
	@FullName nvarchar(100),
	@email varchar(100),
	@Phone_Number varchar(20),
	@BirthDay date,
	@Gender nvarchar(10),
	@Address nvarchar(200)
as
	begin
		if(exists (select * from Users where email = @email))
		begin
			return -1 
		end
		eLSE
		Begin
			Insert into Users(FulLName,email,Phone_Number,BirthDay,Gender,Address)
			values (@FullName,@email,@Phone_Number,@BirthDay,@Gender,@Address)
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
	@Address nvarchar(200)
as
	Begin
		Update Users
		Set FullName = @FullName,
			email = @email,
			Phone_Number = @Phone_Number,
			BirthDay = @BirthDay,
			Gender = @Gender,
			Address= @Address
		Where id = @User_id
	End





