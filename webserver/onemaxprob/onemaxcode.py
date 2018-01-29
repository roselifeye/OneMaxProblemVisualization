# -*- coding: utf-8 -*-

from __future__ import absolute_import
from __future__ import unicode_literals

import random

from deap import base
from deap import creator
from deap import tools
class oneMaxProblem():
    maxFitList = [];
    avgFitList = [];
    minFitList = [];
    popList = [];
    def __init__(self):


        # the goal ('fitness') function to be maximized
        def evalOneMax(individual):
            return sum(individual),

        creator.create("FitnessMax", base.Fitness, weights=(1.0,))
        creator.create("Individual", list, fitness=creator.FitnessMax)

        self.toolbox = base.Toolbox()

        # Attribute generator
        #                      define 'attr_bool' to be an attribute ('gene')
        #                      which corresponds to integers sampled uniformly
        #                      from the range [0,1] (i.e. 0 or 1 with equal
        #                      probability)
        self.toolbox.register("attr_bool", random.randint, 0, 1)

        #----------
        # Operator registration
        #----------
        # register the goal / fitness function
        self.toolbox.register("evaluate", evalOneMax)

        # register the crossover operator
        self.toolbox.register("mate", tools.cxTwoPoint)

        # register a mutation operator with a probability to
        # flip each attribute/gene of 0.05
        self.toolbox.register("mutate", tools.mutFlipBit, indpb=0.05)

        # operator for selecting individuals for breeding the next
        # generation: each individual of the current generation
        # is replaced by the 'fittest' (best) of three individuals
        # drawn randomly from the current generation.
        self.toolbox.register("select", tools.selTournament, tournsize=3)



    #----------
    # Parameters:
    #   Generations:
    #   Poolsize:
    #   Crossover Rate:
    #   Mutation Rate:
    def onemaxSolution(self, generations, poolsize, genelen, crossRate, MutaRate):
        self.generations = generations
        self.poolsize = poolsize
        self.genelen = genelen
        self.maxFitList = []
        self.avgFitList = []
        self.minFitList = []
        self.popList = []
        random.seed(64)

        # Structure initializers
        #                         define 'individual' to be an individual
        #                         consisting of 20 'attr_bool' elements ('genes')
        self.toolbox.register("individual", tools.initRepeat, creator.Individual, self.toolbox.attr_bool, genelen)

        # define the population to be a list of individuals
        self.toolbox.register("population", tools.initRepeat, list, self.toolbox.individual)

        # create an initial population of 10 individuals (where
        # each individual is a list of integers)
        pop = self.toolbox.population(n=poolsize)

        # CXPB  is the probability with which two individuals
        #       are crossed
        #
        # MUTPB is the probability for mutating an individual
        CXPB, MUTPB = 0.5, 0.2
        CXPB, MUTPB = crossRate, MutaRate

        print("Start of evolution")

        # Evaluate the entire population
        fitnesses = list(map(self.toolbox.evaluate, pop))
        for ind, fit in zip(pop, fitnesses):
            ind.fitness.values = fit

        print("  Evaluated %i individuals" % len(pop))

        # Extracting all the fitnesses of
        fits = [ind.fitness.values[0] for ind in pop]

        # Variable keeping track of the number of generations
        g = 0

        # Begin the evolution
        while max(fits) < self.genelen or g < self.generations:
            # A new generation
            g = g + 1
            # print("-- Generation %i --" % g)

            # Select the next generation individuals
            offspring = self.toolbox.select(pop, len(pop))
            # Clone the selected individuals
            offspring = list(map(self.toolbox.clone, offspring))

            # Apply crossover and mutation on the offspring
            for child1, child2 in zip(offspring[::2], offspring[1::2]):
                # cross two individuals with probability CXPB
                if random.random() < CXPB:
                    self.toolbox.mate(child1, child2)

                    # fitness values of the children
                    # must be recalculated later
                    del child1.fitness.values
                    del child2.fitness.values

            for mutant in offspring:
                # mutate an individual with probability MUTPB
                if random.random() < MUTPB:
                    self.toolbox.mutate(mutant)
                    del mutant.fitness.values

            # Evaluate the individuals with an invalid fitness
            invalid_ind = [ind for ind in offspring if not ind.fitness.valid]
            fitnesses = map(self.toolbox.evaluate, invalid_ind)
            for ind, fit in zip(invalid_ind, fitnesses):
                ind.fitness.values = fit

            # print("  Evaluated %i individuals" % len(invalid_ind))

            # The population is entirely replaced by the offspring
            pop[:] = offspring

            # Gather all the fitnesses in one list and print the stats
            # temp = sorted(pop,key=lambda x:(x.fitness.values[0]) ,reverse=False)
            # print("  TTTTT %s" % temp)
            fits = [ind.fitness.values[0] for ind in pop]

            # Each generation pop
            # Data format: [0,1,8]: X, Y, Size of the dot.
            generPopList = []
            popLen = len(pop)
            # if popLen > 50 :
            #     popLen = 50;
            for index in range(popLen):
                # fits.append(pop[index].fitness.values[0])
                for indexG in range(len(pop[index])):
                    if pop[index][indexG] == 1:
                        # print pop[index][indexG]
                        indStat = []
                        indStat.append(indexG)
                        indStat.append(index+1)
                        # Size of the red dot
                        indStat.append(6)
                        # print("------%s" % indStat)
                        # self.popList.append(indStat)
                        generPopList.append(indStat)

            length = len(pop)
            mean = sum(fits) / length
            sum2 = sum(x*x for x in fits)
            std = abs(sum2 / length - mean**2)**0.5

            # print("  Min %s" % min(fits))
            # print("  Max %s" % max(fits))
            # print("  Avg %s" % mean)
            # print("  Std %s" % std)
            # print("    Len %s" % len(fits))
            # print("  ind %s" % pop)
            self.maxFitList.append(max(fits))
            self.avgFitList.append(mean)
            self.minFitList.append(min(fits))
            self.popList.append(generPopList)
            # self.popList = pop
        # print("-- End of (successful) evolution --")

        best_ind = tools.selBest(pop, 1)[0]
        # print("Best individual is %s, %s" % (best_ind, best_ind.fitness.values))
