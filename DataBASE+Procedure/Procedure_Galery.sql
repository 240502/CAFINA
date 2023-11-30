use Cafina
select * From Product
select * From Galery

Create Proc Pro_Get_Galery_By_ProductId
	@ProductId varchar(100)
As
	Begin
		Select * From Galery
		Where ProductId =  @ProductId
	End


	EXEC Pro_Get_Galery_By_ProductId '6KS23W005'	
	EXEC Pro_Get_Galery_By_ProductId '8BP23W016'
	EXEC Pro_Get_Galery_By_ProductId '8TH23W008'
	EXEC Pro_Get_Galery_By_ProductId '8TW23W014'
	EXEC Pro_Get_Galery_By_ProductId '8BP23W008'
	EXEC Pro_Get_Galery_By_ProductId '3OT23W005'
	EXEC Pro_Get_Galery_By_ProductId '8OT23W029'
	EXEC Pro_Get_Galery_By_ProductId '8TE23W002'
	EXEC Pro_Get_Galery_By_ProductId '6KS23W005'
	EXEC Pro_Get_Galery_By_ProductId '6TE23W014'
	EXEC Pro_Get_Galery_By_ProductId '6OT23W014'
Create Proc Pro_Create_Galery
	@productid varchar(100),
	@thumbnail varchar(100)
As
	Begin
		Insert into Galery(ProductId,thumbnail)
		Values(@productid,@thumbnail)
	End
exec Pro_Create_Galery 'sp04','./assets/Image/ImageProduct/6BS23S009_1.webp'
Select* from Galery

Create Proc Pro_Update_Galery
	@id int,
	@productid varchar(100),
	@thumbnail varchar(100)
As
	Begin
		Update  Galery set productid = @productid, thumbnail = @thumbnail
		Where id = @id
	End
Create Proc Pro_Delete_Galery

	@productid varchar(100)
As 
	Begin
		Delete Galery
		Where ProductId = @productid
	End
