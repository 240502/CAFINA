use Cafina
select * from [Object]

create fulltext catalog SearchOb
WITH accent_sensitivity = off
as default

select * from [Object]  o inner join Category c on o.id = c.[Object_id]
where (contains(TenDoiTuong,'nam') or TenDoiTuong lIKE 'All' )and CateName LIKE N'Áo%'
exec Pro_Get_By_CateName N'Áo',N'Nữ'

Create Proc Pro_Get_By_CateName 
	@catename nvarchar(50),
	@objectname nvarchar(50)
AS
	Begin
		Select cd.id , cd.DetailName, o.TenDoiTuong 
		From Category c inner join CategoryDetails cd on c.id = cd.CateId inner join [Object] o on cd.Object_id = o.id
		Where c.CateName Like @catename AND (TenDoiTuong Like 'All' or Contains (TenDoiTuong,@objectname))
	End
alter Proc Pro_Get_By_CateName_And_ObjectName
	@catename nvarchar(100),
	@objectname nvarchar(50)
As
	Begin
		Select c.id, c.CateName,o.TenDoiTuong
		From CategoryDetails c inner join [Object] o on c.[Object_id] = o.id
		Where CateName Like  @catename+'%' and (TenDoiTuong LIKE 'All'  or contains(TenDoiTuong,@objectname))
	End
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
	@CateName nvarchar(100)
as
	begin
		if(exists (Select * from Category where CateName = @CateName))
		begin
			return -1
		end
		else
		begin
			insert into Category(CateName)
			values (@CateName)
		end
	end
Select * From Category Where CateName = N'Quần nót nam'
exec Pro_Create_Cate N'Quần nót nam'
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

create proc Pro_Update_Cate
	@id int,
	@cateName nvarchar(100)
as
	begin
		if(not exists(select * from Category where id = @id))
		begin
			return -1
		end
		else
		begin
			update Category
			set CateName = @cateName
			where id = @id
		end
	end
