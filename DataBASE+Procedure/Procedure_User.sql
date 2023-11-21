
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
select * from Account
exec Pro_Search_Us 'Sang',1,10
alter Procedure Pro_Search_Us
	@value nvarchar(100),
	@pageIndex int,
	@pageSize int

as
	Begin
		Declare @RecordCount int
		If(@pageSize > 0)
		Begin
			Select ROW_NUMBER() Over (Order By u.id) as RowNumber, u.id,u.FullName,u.email,u.Phone_Number,u.BirthDay,u.Gender,u.Address
			Into #Result1
			From Users u inner join Account a on u.id = a.User_id inner join [Role] r on a.Role_Id = r.id
			Where ((convert(varchar(10),u.id) = @value) 
			or (FullName Like @value +'%')  
			or (FullName lIKE '%'+@value) 
			or (email like @value) or (convert(varchar(100),BirthDay) like @value)
			or (Phone_Number like @value)
			or (Gender like @value)
			or (Address like @value +'%')
			or (Address like '%'+ @value )
			) and r.RoName Like 'user'
			Select @RecordCount = COUNT(*)
			From #Result1
			Select @RecordCount as RecordCount, *
			From #Result1
			Where RowNumber between(@pageIndex-1) * @pageSize+1 and (((@pageIndex-1)*@pageSize+1)+@pageSize)-1
				or @pageIndex =-1
			drop table #result1
		End
		Else
		Begin
			Select ROW_NUMBER() Over (Order By u.id) as RowNumber, u.id,u.FullName,u.email,u.Phone_Number,u.BirthDay,u.Gender,u.Address
			Into #Result2
			From Users u inner join Account a on u.id = a.User_id inner join [Role] r on a.Role_Id = r.id
			Where ((convert(varchar(10),u.id) = @value) 
			or (FullName Like @value +'%')  
			or (FullName lIKE '%'+@value) 
			or (email like @value) or (convert(varchar(100),BirthDay) like @value)
			or (Phone_Number like @value)
			or (Gender like @value)
			or (Address like '%'+@value)
			or (Address like @value+'%')
			
			) and r.RoName Like 'user'
			Select @RecordCount = COUNT(*)
			From #Result2
			Select @RecordCount as RecordCount, *
			From #Result2
			drop table #result2
		End
	End

select * from Users
alter procedure Pro_ThongKe_User
	@fr_date int,
	@to_date int,
	@year int
as 
	begin
		select top 5 u.id,u.FullName,u.email,u.Phone_Number,u.BirthDay,u.Gender,u.Address,SUM(od.Amount*od.Price)  as [Tổng tiền mua]
		from Users u inner join  [Order] o on u.id = o.[user_id] inner join  Order_Details od on o.id = od.OrderId
		where 	((@fr_date = 0 and @to_date > 0 and MONTH(o.order_date) = @to_date and Year(o.order_date) = @year)
		or (@fr_date > 0 and @to_date = 0 and MONTH(o.order_date) = @fr_date and Year(o.order_date) = @year)
		or (@fr_date = 0 and @to_date = 0  and Year(o.order_date) = @year)
		or (@fr_date > 0 and @to_date > 0 and (MONTH(o.order_date) between  @fr_date and @to_date) and Year(o.order_date) = @year))
		and o.status  > 2 
		group by  u.id,u.FullName,u.email,u.Phone_Number,u.BirthDay,u.Gender,u.Address
		order by  [Tổng tiền mua] desc 
	end
	select * from Users
exec Pro_ThongKe_User 11,11,2023
select * from [Order] 
where Month(order_date) = 11

 alter proc Pro_Total_User
as
	Begin
		Select Count(*) as total
		From [Users]
	End
exec Pro_Total_User
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

exec Pro_Update_User 1,N'Nguyễn Văn Sang','sanghip200@gmail.com','0942050188','2002-05-24','Nam','An Vĩ - Khoái Châu - Hưng Yên'
alter Procedure Pro_Update_User
	@User_id int,
	@FullName nvarchar(100),
	@email varchar(100),
	@Phone_Number varchar(20),
	@BirthDay date,
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
select * From Role
Alter Proc Pro_Get_ListUS
	@pageIndex int,
	@pageSize int
As
	Begin
		Declare @RecordCount int;
		If(@pageSize > 0 )
		Begin
			Select (Row_Number() Over(Order by Year(Birthday))) as RowNumber,
			u.id,u.FullName,u.email,u.Phone_Number,u.BirthDay,u.Gender,u.Address
			Into #Result1
			From Users u inner join Account a on u.id = a.User_id inner join [Role] r on a.Role_Id = r.id
			Where r.RoName = 'user'
			Select @RecordCount = Count(*)
			From #Result1
			Select @RecordCount as RecordCount , *
			From #Result1
			where RowNumber between(@pageIndex-1) * @pageSize+1 and (((@pageIndex-1)*@pageSize+1)+@pageSize)-1
				or @pageIndex =-1
			Drop table #Result1
		End
		Else 
		Begin
			Select u.id,u.FullName,u.email,u.Phone_Number,u.BirthDay,u.Gender,u.Address
			Into #Result2
			From Users u inner join Account a on u.id = a.User_id inner join [Role] r on a.Role_Id = r.id
			Where r.RoName = 'user'
			Select @RecordCount = COUNT(*)
			From #Result2
			Select @RecordCount AS RecordCount,*
			From #Result2
			Drop table #Result2
			
		End
	End
Exec Pro_Get_ListUS 1,10





