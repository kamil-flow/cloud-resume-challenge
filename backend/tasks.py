from invoke import tasks
from render_items.tasks import render_items

@task
def render_projects(c):
    render_items('projects')

@task
def render_blog:(c):
    render_items('blog')
