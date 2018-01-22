# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
# Create your views here.

from onemaxcode import oneMaxProblem

onemaxProject = oneMaxProblem(20)
onemaxProject.onemaxSolution(100, 20, 0.5, 0.2)


def index(request):
    return render(request, 'onemaxprob/oneMaxProblem.html', {})


def onemaxSol(request):
    onemaxData = {'maxFitList': onemaxProject.maxFitList,
                  'avgFitList': onemaxProject.avgFitList,
                  'minFitList': onemaxProject.minFitList,
                  'popList': onemaxProject.popList}
    # print onemaxProject.popList
    return JsonResponse(onemaxData)
