import { Request, Response } from "express";
import { Activity } from "../models/Activity";
import dayjs from "dayjs";
import { validate } from "class-validator";

const createActivity = async(req: Request, res: Response) => {
  try {
    // Recuperamos la información que nos envían desde el body
    const { title, type, id_details, intensity, minimum_age, description, price, image } = req.body;

    //Creamos un objeto para la validación
    const ActivityValidate = new Activity();
    ActivityValidate.title = title.trim();
    ActivityValidate.type = "terrestre", "acuatica";
    ActivityValidate.id_details = id_details.trim();
    ActivityValidate.intensity = "high", "medium", "low";
    ActivityValidate.minimum_age = minimum_age;
    ActivityValidate.description = description.trim();
    ActivityValidate.price = price;
    ActivityValidate.image = image.trim();
    ActivityValidate.is_active = true;
    ActivityValidate.updated_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );
    ActivityValidate.created_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );

    //Evaluamos la validacion mediante class-validator validate
    const errorValidate = await validate(ActivityValidate);
    if (errorValidate.length > 0) {
      return res.status(404).json(errorValidate);
    }

    
    const newActivity = await Activity.create({
      title: title.trim(),
      type,
      id_details: id_details.trim(),
      intensity,
      minimum_age,
      description: description.trim(),
      price,
      image: image.trim()

    }).save();
    if (newActivity) {
      return res.json({
        success: true,
        message: `Se ha creado la actividad`,
        data: newActivity
      });
    }
  } catch (error) {
    console.error("Error en la creación de la actividad:", error);
    res.status(500).json(`Error al crear la actividad: ${error}`);
  }
};
const updateActivity = (req: Request, res: Response) => {
  return res.send("Modificar actividad");
};
const getActivityById = (req: Request, res: Response) => {
  return res.send("Recuperar actividad por Id");
};
const getActivityByType = (req: Request, res: Response) => {
  return res.send("Recuperar actividad por Type");
};
const getAllActivities = (req: Request, res: Response) => {
  return res.send("Recuperar todas las actividades");
};
const deleteActivity = (req: Request, res: Response) => {
  return res.send("Eliminar actividad");
};
export { getAllActivities, createActivity, updateActivity, getActivityById, getActivityByType, deleteActivity };
