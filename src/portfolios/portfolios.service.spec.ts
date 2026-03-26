import { Test, TestingModule } from '@nestjs/testing';
import { PortfoliosService } from './portfolios.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Portfolio } from '../portfolios/entity/portfolio.entity';
import { Customer } from '../customers/customer.entity';
import { Policy } from '../policies/policy.entity';

describe('PortfoliosService', () => {
  let service: PortfoliosService;

  const mockPortfolioRepo = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockCustomerRepo = {
    findOne: jest.fn(),
  };

  const mockPolicyRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfoliosService,
        {
          provide: getRepositoryToken(Portfolio),
          useValue: mockPortfolioRepo,
        },
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepo,
        },
        {
          provide: getRepositoryToken(Policy),
          useValue: mockPolicyRepo,
        },
      ],
    }).compile();

    service = module.get<PortfoliosService>(PortfoliosService);
  });

  it('should create portfolio successfully', async () => {
    const customer = { id: 1, customerCode: 'C001' };
    const policy = { id: 1, policyCode: 'KMASTER' };

    mockCustomerRepo.findOne.mockResolvedValue(customer);
    mockPolicyRepo.findOne.mockResolvedValue(policy);

    mockPortfolioRepo.create.mockReturnValue({
      portfolioCode: 'P-123',
      customer,
      policy,
    });

    mockPortfolioRepo.save.mockResolvedValue({
      id: 1,
      portfolioCode: 'P-123',
      customer,
      policy,
    });

    const result = await service.create({
      customerCode: 'C001',
      policyCode: 'KMASTER',
    });

    expect(result.portfolioCode).toBeDefined();
  });
});
