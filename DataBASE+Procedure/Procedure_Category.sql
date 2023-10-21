use Cafina
select * from [Object]

create fulltext catalog SearchOb
WITH accent_sensitivity = off
as default

select * from [Object]  o inner join Category c on o.id = c.[Object_id]
where  c.id = 5 
Alter Proc Pro_GetCate_ByObId
	@ob_id nvarchar(50)
As 
	Begin
		Select * From Category 
		Where [Object_id] = @ob_id or [Object_id] = 5 or @ob_id = null
	End
Exec Pro_GetCate_ByObId 

Create Procedure Pro_Get_Cate_By_Id
	@id int
As
	Begin
		If(Not Exists (Select * From Category Where id = @id))
		Begin
			Return -1
		End
		Else
		Begin
			Select * From Category
			Where id = @id
		End
	End

Create Procedure Pro_Search_Cate_By_Name
	@CateName nvarchar(100)
As
	Begin
		If(Not Exists(Select * From Category Where CateName = @CateName))
		Begin
			Return -1
		End
		Else
		Begin
			Select * From Category Where CateName = @CateName
		End
	End
Alter proc Pro_Create_Cate
	@CateName nvarchar(100),
	@Ob_id int
as
	begin
		if(exists (Select * from Category where CateName = @CateName))
		begin
			return -1
		end
		else
		begin
			insert into Category(CateName,Object_id)
			values (@CateName,@Ob_id)
		end
	end
create proc Pro_Delete_Cate
	@id int
as
	begin
		if(not exists(select * from Category where id = @id))
		begin
			return -1
		end
		else
		begin
			delete Category
			where id = @id
		end
	end

alter proc Pro_Update_Cate
	@id int,
	@cateName nvarchar(100),
	@ob_id int
as
	begin
		if(not exists(select * from Category where id = @id))
		begin
			return -1
		end
		else
		begin
			update Category
			set CateName = @cateName, Object_id = @ob_id
			where id = @id
		end
	end
