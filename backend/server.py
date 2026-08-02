from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="World Miracles Semences TV API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class Program(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    day: str  # Lundi, Mardi, ...
    time: str  # "08:00"
    end_time: Optional[str] = None
    title: str
    host: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str


# ---------- Static Program Grid (fallback seed) ----------
DEFAULT_PROGRAMS = [
    # Lundi
    {"day": "Lundi", "time": "06:00", "end_time": "07:00", "title": "Réveil de Feu",
     "host": "Pasteur David", "category": "Prière",
     "description": "Prière matinale pour commencer la semaine avec puissance."},
    {"day": "Lundi", "time": "09:00", "end_time": "10:30", "title": "La Parole en Marche",
     "host": "Past. Grâce Mbemba", "category": "Enseignement",
     "description": "Étude biblique approfondie sur les semences de la foi."},
    {"day": "Lundi", "time": "12:00", "end_time": "13:00", "title": "Journal WMS",
     "host": "Rédaction WMS", "category": "Info",
     "description": "L'actualité chrétienne de la semaine."},
    {"day": "Lundi", "time": "19:00", "end_time": "20:30", "title": "Culte de Miracle",
     "host": "Apôtre Emmanuel", "category": "Culte",
     "description": "Louange, adoration et manifestation de la puissance de Dieu."},

    # Mardi
    {"day": "Mardi", "time": "06:00", "end_time": "07:00", "title": "Réveil de Feu",
     "host": "Pasteur David", "category": "Prière",
     "description": "Intercession et déclarations prophétiques."},
    {"day": "Mardi", "time": "10:00", "end_time": "11:30", "title": "Semences de Vie",
     "host": "Past. Ruth Kamba", "category": "Enseignement",
     "description": "La série phare sur les principes de semailles et de moisson."},
    {"day": "Mardi", "time": "15:00", "end_time": "16:00", "title": "Famille & Foi",
     "host": "Couple Bakala", "category": "Famille",
     "description": "Conseils bibliques pour couples et parents."},
    {"day": "Mardi", "time": "20:00", "end_time": "21:30", "title": "Nuit de Délivrance",
     "host": "Apôtre Emmanuel", "category": "Délivrance",
     "description": "Ministère de guérison et de libération en direct."},

    # Mercredi
    {"day": "Mercredi", "time": "06:00", "end_time": "07:00", "title": "Réveil de Feu",
     "host": "Pasteur David", "category": "Prière",
     "description": "Prière matinale et Parole du jour."},
    {"day": "Mercredi", "time": "09:30", "end_time": "10:30", "title": "Kids Miracles",
     "host": "Tantine Esther", "category": "Jeunesse",
     "description": "Émission spéciale pour les enfants."},
    {"day": "Mercredi", "time": "13:00", "end_time": "14:00", "title": "Louange sans Frontières",
     "host": "Chorale WMS", "category": "Musique",
     "description": "Le meilleur du gospel africain et international."},
    {"day": "Mercredi", "time": "19:00", "end_time": "21:00", "title": "Étude Biblique en Direct",
     "host": "Past. Grâce Mbemba", "category": "Enseignement",
     "description": "Enseignement interactif avec questions/réponses."},

    # Jeudi
    {"day": "Jeudi", "time": "06:00", "end_time": "07:00", "title": "Réveil de Feu",
     "host": "Pasteur David", "category": "Prière",
     "description": "Décrets prophétiques du jeudi."},
    {"day": "Jeudi", "time": "11:00", "end_time": "12:00", "title": "Femmes de Grâce",
     "host": "Past. Ruth Kamba", "category": "Femmes",
     "description": "Émission dédiée aux femmes chrétiennes."},
    {"day": "Jeudi", "time": "17:00", "end_time": "18:00", "title": "Jeunesse en Feu",
     "host": "Junior Malonga", "category": "Jeunesse",
     "description": "L'émission des jeunes chrétiens de 15 à 30 ans."},
    {"day": "Jeudi", "time": "20:00", "end_time": "22:00", "title": "Croisade Live",
     "host": "Apôtre Emmanuel", "category": "Culte",
     "description": "Retransmission des croisades d'évangélisation."},

    # Vendredi
    {"day": "Vendredi", "time": "06:00", "end_time": "07:00", "title": "Réveil de Feu",
     "host": "Pasteur David", "category": "Prière",
     "description": "Prière de clôture de semaine."},
    {"day": "Vendredi", "time": "10:00", "end_time": "11:00", "title": "Business & Royaume",
     "host": "Dr. Samuel Ilunga", "category": "Marketplace",
     "description": "Entrepreneuriat chrétien et vision du Royaume."},
    {"day": "Vendredi", "time": "16:00", "end_time": "17:30", "title": "Concert Gospel",
     "host": "Artistes invités", "category": "Musique",
     "description": "Concert live avec des artistes gospel."},
    {"day": "Vendredi", "time": "20:00", "end_time": "22:30", "title": "Veillée de Miracles",
     "host": "Apôtre Emmanuel", "category": "Culte",
     "description": "Grande veillée hebdomadaire de miracles."},

    # Samedi
    {"day": "Samedi", "time": "08:00", "end_time": "09:00", "title": "Semences Matin",
     "host": "Past. Ruth Kamba", "category": "Enseignement",
     "description": "Un temps de méditation le samedi matin."},
    {"day": "Samedi", "time": "11:00", "end_time": "13:00", "title": "Séminaire du Samedi",
     "host": "Invités internationaux", "category": "Séminaire",
     "description": "Enseignements de leaders internationaux."},
    {"day": "Samedi", "time": "17:00", "end_time": "18:30", "title": "Musique & Témoignages",
     "host": "Rédaction WMS", "category": "Témoignages",
     "description": "Louange entrecoupée de témoignages puissants."},
    {"day": "Samedi", "time": "20:00", "end_time": "22:00", "title": "Cinéma Chrétien",
     "host": "WMS Films", "category": "Films",
     "description": "Films et documentaires édifiants."},

    # Dimanche
    {"day": "Dimanche", "time": "07:00", "end_time": "08:00", "title": "École du Dimanche",
     "host": "Diverses équipes", "category": "Enseignement",
     "description": "Programme adapté à toutes les tranches d'âge."},
    {"day": "Dimanche", "time": "09:00", "end_time": "12:00", "title": "Culte Dominical en Direct",
     "host": "Apôtre Emmanuel", "category": "Culte",
     "description": "Le grand culte hebdomadaire retransmis en direct."},
    {"day": "Dimanche", "time": "15:00", "end_time": "16:30", "title": "Rediffusion Culte",
     "host": "Apôtre Emmanuel", "category": "Culte",
     "description": "Rediffusion du culte du matin."},
    {"day": "Dimanche", "time": "19:00", "end_time": "20:30", "title": "Soirée Louange",
     "host": "Chorale WMS", "category": "Musique",
     "description": "Adoration et louange pour clôturer la semaine."},
]


async def seed_programs():
    count = await db.programs.count_documents({})
    if count == 0:
        docs = []
        for p in DEFAULT_PROGRAMS:
            program = Program(**p)
            docs.append(program.model_dump())
        if docs:
            await db.programs.insert_many(docs)
            logger.info(f"Seeded {len(docs)} programs.")


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "World Miracles Semences TV API", "status": "online"}


@api_router.get("/channel")
async def channel_info():
    return {
        "name": "World Miracles Semences TV",
        "short_name": "WMS TV",
        "tagline": "La chaîne des semences de miracles",
        "description": (
            "World Miracles Semences TV (WMS TV) est une chaîne chrétienne dédiée à la "
            "propagation de la Parole de Dieu, à la manifestation des miracles et à "
            "l'édification du corps de Christ. À travers ses programmes, WMS TV sème des "
            "semences de foi, d'espérance et de restauration dans le cœur de millions de "
            "téléspectateurs à travers l'Afrique et le monde."
        ),
        "stream_url": "https://restream.munokolive.com/2bf9618b-c89b-4852-9b55-27fbc152365e.html",
        "domain": "wms-tv.online",
        "languages": ["Français", "Lingala", "Anglais"],
        "founded": 2021,
    }


@api_router.get("/programs", response_model=List[Program])
async def list_programs(day: Optional[str] = None):
    query = {"day": day} if day else {}
    docs = await db.programs.find(query, {"_id": 0}).to_list(length=1000)
    day_order = {"Lundi": 1, "Mardi": 2, "Mercredi": 3, "Jeudi": 4,
                 "Vendredi": 5, "Samedi": 6, "Dimanche": 7}
    docs.sort(key=lambda d: (day_order.get(d.get("day", ""), 99), d.get("time", "")))
    return docs


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(payload: ContactMessageCreate):
    msg = ContactMessage(**payload.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def on_startup():
    await seed_programs()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
