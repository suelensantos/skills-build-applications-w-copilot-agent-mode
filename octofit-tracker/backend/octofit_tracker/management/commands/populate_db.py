from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.conf import settings
from pymongo import MongoClient
from datetime import timedelta
from bson import ObjectId

class Command(BaseCommand):
    help = 'Populate the database with test data for users, teams, activity, leaderboard, and workouts'

    def handle(self, *args, **kwargs):
        # Connect to MongoDB
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop existing collections
        db.users.drop()
        db.teams.drop()
        db.activity.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create users
        users = [
            User(_id=ObjectId(), email='thundergod@mhigh.edu', name='Thundergod'),
            User(_id=ObjectId(), email='metalgeek@mhigh.edu', name='Metalgeek'),
            User(_id=ObjectId(), email='zerocool@mhigh.edu', name='Zerocool'),
            User(_id=ObjectId(), email='crashoverride@mhigh.edu', name='Crashoverride'),
            User(_id=ObjectId(), email='sleeptoken@mhigh.edu', name='Sleeptoken'),
        ]
        User.objects.bulk_create(users)

        # Create teams
        blue_team = Team(_id=ObjectId(), name='Blue Team')
        gold_team = Team(_id=ObjectId(), name='Gold Team')
        blue_team.save()
        gold_team.save()
        for user in users:
            blue_team.members.add(user)
            gold_team.members.add(user)

        # Create activities
        activities = [
            Activity(_id=ObjectId(), user=users[0], activity_type='Cycling', duration=60, date='2025-04-01', points=100),
            Activity(_id=ObjectId(), user=users[1], activity_type='Crossfit', duration=120, date='2025-04-02', points=90),
            Activity(_id=ObjectId(), user=users[2], activity_type='Running', duration=90, date='2025-04-03', points=95),
            Activity(_id=ObjectId(), user=users[3], activity_type='Strength', duration=30, date='2025-04-04', points=85),
            Activity(_id=ObjectId(), user=users[4], activity_type='Swimming', duration=75, date='2025-04-05', points=80),
        ]
        Activity.objects.bulk_create(activities)

        # Create leaderboard entries
        leaderboard_entries = [
            Leaderboard(_id=ObjectId(), team=blue_team, total_points=470, month='April 2025'),
            Leaderboard(_id=ObjectId(), team=gold_team, total_points=470, month='April 2025'),
        ]
        Leaderboard.objects.bulk_create(leaderboard_entries)

        # Create workouts
        workouts = [
            Workout(_id=ObjectId(), name='Cycling Training', description='Training for a road cycling event'),
            Workout(_id=ObjectId(), name='Crossfit', description='Training for a crossfit competition'),
            Workout(_id=ObjectId(), name='Running Training', description='Training for a marathon'),
            Workout(_id=ObjectId(), name='Strength Training', description='Training for strength'),
            Workout(_id=ObjectId(), name='Swimming Training', description='Training for a swimming competition'),
        ]
        Workout.objects.bulk_create(workouts)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data.'))
