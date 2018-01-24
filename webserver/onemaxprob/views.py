# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
# Create your views here.

from onemaxcode import oneMaxProblem

onemaxProject = oneMaxProblem()
# generations, poolsize, genelen, crossRate, MutaRate
onemaxProject.onemaxSolution(150, 500, 40, 0.5, 0.2)


def index(request):
    return render(request, 'onemaxprob/oneMaxProblem.html', {})


def onemaxSol(request):
    onemaxData = {'maxFitList': onemaxProject.maxFitList,
                  'avgFitList': onemaxProject.avgFitList,
                  'minFitList': onemaxProject.minFitList,
                  'popList': onemaxProject.popList}
    # print onemaxProject.popList
    return JsonResponse(onemaxData)

def parameterUpdate(request):
    # print request.GET['generationNum']
    # parameters = json.loads(request.body)
    onemaxProject.onemaxSolution(int(request.GET['generationNum']), int(request.GET['poolSizeNum']), int(request.GET['genesNum']), 0.5, 0.2)
    return HttpResponse('success')
